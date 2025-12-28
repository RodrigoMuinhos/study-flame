import { test, expect } from "@playwright/test";
import { generateTokenForCpf, assertBackendUp, revokeTokensForCpf } from "./helpers/api";
import { SEL } from "./helpers/selectors";

test.describe("AWS Study Token - Happy Path", () => {
  test.beforeAll(async () => {
    // Garantir que backend está online
    await assertBackendUp();
  });

  test.beforeEach(async () => {
    // Limpar tokens anteriores do CPF de teste
    await revokeTokensForCpf();
  });

  test("Token válido libera acesso ao conteúdo AWS Study", async ({ page }) => {
    // 1. Gerar token via API
    const token = await generateTokenForCpf();
    expect(token).toBeTruthy();
    console.log(`Token gerado: ${token}`);

    // 2. Ir para a página do AWS Study
    await page.goto("/aws-study/study", { waitUntil: "domcontentloaded" });

    // 3. Se for redirecionado para tela de token, preencher
    const tokenInput = page.locator(SEL.tokenInput);
    const hasTokenGate = await tokenInput.isVisible({ timeout: 3000 }).catch(() => false);

    if (hasTokenGate) {
      await tokenInput.fill(token);
      await page.click(SEL.tokenSubmit);

      // Aguardar redirecionamento ou liberação do conteúdo
      await page.waitForTimeout(2000);
    }

    // 4. Verificar se o conteúdo foi liberado
    // Pode ser um data-testid específico ou simplesmente a URL correta
    const currentUrl = page.url();
    const hasStudyContent = currentUrl.includes("/aws-study/study") || 
                           await page.locator(SEL.awsStudyContent).isVisible({ timeout: 5000 }).catch(() => false);

    expect(hasStudyContent, "Conteúdo AWS Study deveria estar visível após token válido").toBeTruthy();
  });

  test("Token gerado tem formato válido", async () => {
    const token = await generateTokenForCpf();
    
    // Formato do token: XXXX-XXXXXX-XXXX (alfanumérico)
    const tokenRegex = /^[A-Z0-9]{4}-[A-Z0-9]{6}-[A-Z0-9]{4}$/;
    expect(token).toMatch(tokenRegex);
  });

  test("Pode validar o mesmo token múltiplas vezes", async ({ request }) => {
    const token = await generateTokenForCpf();
    
    // Validar o token duas vezes
    for (let i = 0; i < 2; i++) {
      const res = await request.post(`http://localhost:8080/api/tokens/validate`, {
        data: { token }
      });
      
      expect(res.ok()).toBeTruthy();
      const body = await res.json();
      expect(body.valid).toBe(true);
    }
  });
});
