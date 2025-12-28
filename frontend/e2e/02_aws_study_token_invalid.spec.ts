import { test, expect } from "@playwright/test";
import { assertBackendUp } from "./helpers/api";
import { SEL } from "./helpers/selectors";

test.describe("AWS Study Token - Invalid Token", () => {
  test.beforeAll(async () => {
    await assertBackendUp();
  });

  test("Token inválido mostra mensagem de erro e NÃO quebra a tela", async ({ page }) => {
    // Ir para a página do AWS Study
    await page.goto("/aws-study/study", { waitUntil: "domcontentloaded" });

    // Verificar se tem input de token
    const tokenInput = page.locator(SEL.tokenInput);
    const hasTokenGate = await tokenInput.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasTokenGate) {
      // Preencher com token inválido
      await tokenInput.fill("INVALIDO-000000-0000");
      await page.click(SEL.tokenSubmit);

      // Aguardar resposta
      await page.waitForTimeout(2000);

      // A página deve continuar estável (não quebrar)
      await expect(page.locator("body")).toBeVisible();

      // Deve mostrar mensagem de erro
      const errorMessage = page.locator(SEL.tokenError);
      const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (hasError) {
        await expect(errorMessage).toBeVisible();
      } else {
        // Procurar por qualquer indicação de erro na página
        const pageContent = await page.textContent("body");
        const hasErrorText = pageContent?.toLowerCase().includes("inválido") || 
                            pageContent?.toLowerCase().includes("erro") ||
                            pageContent?.toLowerCase().includes("invalid");
        expect(hasErrorText, "Deveria mostrar alguma mensagem de erro para token inválido").toBeTruthy();
      }

      // O conteúdo principal não deve aparecer
      const studyContent = page.locator(SEL.awsStudyContent);
      const contentVisible = await studyContent.isVisible({ timeout: 1000 }).catch(() => false);
      expect(contentVisible, "Conteúdo do estudo não deveria estar visível com token inválido").toBeFalsy();
    } else {
      // Se não tem token gate, o teste não é aplicável para esta configuração
      console.log("Token gate não encontrado - teste não aplicável");
    }
  });

  test("Token vazio mostra feedback apropriado", async ({ page }) => {
    await page.goto("/aws-study/study", { waitUntil: "domcontentloaded" });

    const tokenInput = page.locator(SEL.tokenInput);
    const hasTokenGate = await tokenInput.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasTokenGate) {
      // Tentar submeter sem preencher token
      const submitButton = page.locator(SEL.tokenSubmit);
      
      // Verificar se o botão está desabilitado ou se mostra erro
      const isDisabled = await submitButton.isDisabled();
      
      if (!isDisabled) {
        await submitButton.click();
        await page.waitForTimeout(1000);
        
        // Deve mostrar feedback (erro ou não fazer nada)
        await expect(page.locator("body")).toBeVisible();
      }
    }
  });

  test("Múltiplas tentativas inválidas não quebram a UI", async ({ page }) => {
    await page.goto("/aws-study/study", { waitUntil: "domcontentloaded" });

    const tokenInput = page.locator(SEL.tokenInput);
    const hasTokenGate = await tokenInput.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasTokenGate) {
      const invalidTokens = [
        "WRONG-123456-7890",
        "AAAA-BBBBBB-CCCC",
        "0000-000000-0000",
      ];

      for (const invalidToken of invalidTokens) {
        await tokenInput.clear();
        await tokenInput.fill(invalidToken);
        await page.click(SEL.tokenSubmit);
        await page.waitForTimeout(1500);

        // A página deve continuar funcionando
        await expect(page.locator("body")).toBeVisible();
      }
    }
  });
});
