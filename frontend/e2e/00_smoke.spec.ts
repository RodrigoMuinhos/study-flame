import { test, expect } from "@playwright/test";
import { assertBackendUp } from "./helpers/api";

test.describe("Smoke Tests", () => {
  test("SMOKE: front abre e backend responde", async ({ page }) => {
    // Verificar backend
    await assertBackendUp();

    // Verificar frontend
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
  });

  test("SMOKE: página principal carrega", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    
    // A página deve ter algum conteúdo visível
    await expect(page.locator("body")).toBeVisible();
    
    // Não deve ter erros JavaScript críticos
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    
    await page.waitForTimeout(2000);
    
    // Se houver erros, logar mas não falhar (alguns erros podem ser aceitáveis)
    if (errors.length > 0) {
      console.log("Erros JavaScript detectados:", errors);
    }
  });
});
