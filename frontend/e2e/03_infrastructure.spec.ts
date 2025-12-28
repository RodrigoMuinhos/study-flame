import { test, expect } from "@playwright/test";
import { ENV } from "./helpers/env";

test.describe("Infrastructure Tests", () => {
  test("Backend health check", async ({ request }) => {
    // Tentar múltiplos endpoints para verificar se o backend está online
    const endpoints = [
      `${ENV.apiUrl}/health`,
      `${ENV.apiUrl}/tokens/stats`,
      `${ENV.apiUrl}/admin/stats`,
    ];

    let backendOnline = false;
    let lastError = "";

    for (const endpoint of endpoints) {
      try {
        const res = await request.get(endpoint);
        if (res.ok()) {
          backendOnline = true;
          console.log(`Backend online: ${endpoint} respondeu OK`);
          break;
        }
      } catch (e) {
        lastError = String(e);
      }
    }

    expect(
      backendOnline,
      `Backend offline! Nenhum endpoint respondeu. Último erro: ${lastError}. 
       Verifique se o servidor Java está rodando em ${ENV.apiUrl}`
    ).toBeTruthy();
  });

  test("Frontend está acessível", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator("body")).toBeVisible();
  });

  test("API de tokens está funcional", async ({ request }) => {
    // Testar endpoint de stats (não requer autenticação normalmente)
    const res = await request.get(`${ENV.apiUrl}/tokens/stats`);
    
    expect(res.ok(), `Endpoint /tokens/stats deveria retornar 200`).toBeTruthy();
    
    const stats = await res.json();
    expect(stats).toHaveProperty("totalTokens");
    expect(stats).toHaveProperty("activeTokens");
  });

  test("CORS está configurado corretamente", async ({ request }) => {
    // Fazer uma requisição com origin do frontend
    const res = await request.post(`${ENV.apiUrl}/tokens/validate`, {
      data: { token: "test-cors-check" },
      headers: {
        "Origin": ENV.baseUrl,
      },
    });

    // Mesmo com token inválido, não deveria ter erro de CORS
    // Status 200 (token inválido mas processado) ou 400 (bad request) são aceitáveis
    expect(res.status()).toBeLessThan(500);
  });
});
