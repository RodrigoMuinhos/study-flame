import { request, expect } from "@playwright/test";
import { ENV } from "./env";

export async function assertBackendUp() {
  const ctx = await request.newContext();
  try {
    // Tentar endpoint de health ou tokens/stats como fallback
    let res = await ctx.get(`${ENV.apiUrl}/health`);
    if (!res.ok()) {
      res = await ctx.get(`${ENV.apiUrl}/tokens/stats`);
    }
    expect(res.ok(), `Backend offline em ${ENV.apiUrl}`).toBeTruthy();
  } finally {
    await ctx.dispose();
  }
}

export async function ensureTestLeadExists(): Promise<void> {
  const ctx = await request.newContext();
  try {
    // Verificar se o lead já existe
    const checkRes = await ctx.get(`${ENV.apiUrl}/leads/cpf/${ENV.cpf}`);
    if (checkRes.ok()) {
      // Lead já existe
      return;
    }

    // Criar lead de teste com todos os campos obrigatórios
    const createRes = await ctx.post(`${ENV.apiUrl}/leads`, {
      data: {
        cpf: ENV.cpf,
        name: "Lead de Teste E2E",
        email: "teste-e2e@example.com",
        phone: "11999999999",
        experience: "Teste E2E automatizado"
      }
    });

    // Se já existe com outro registro ou erro de validação, tudo bem
    if (!createRes.ok() && createRes.status() !== 409) {
      const body = await createRes.text();
      console.log(`Aviso: não foi possível criar lead de teste. Status: ${createRes.status()}, Body: ${body}`);
    }
  } finally {
    await ctx.dispose();
  }
}

export async function generateTokenForCpf(): Promise<string> {
  const ctx = await request.newContext();
  try {
    // Garantir que o lead existe antes de gerar token
    await ensureTestLeadExists();

    const res = await ctx.post(`${ENV.apiUrl}/tokens/generate`, {
      data: { cpf: ENV.cpf }
    });

    const status = res.status();
    const bodyText = await res.text();

    expect(
      res.ok(),
      `Falha ao gerar token. Status=${status}. Body=${bodyText}`
    ).toBeTruthy();

    const json = JSON.parse(bodyText);

    // O controller retorna AccessTokenDTO (tem campo token)
    const token = json?.token;
    expect(token, `Resposta não trouxe campo "token": ${bodyText}`).toBeTruthy();

    return token as string;
  } finally {
    await ctx.dispose();
  }
}

export async function revokeTokensForCpf(): Promise<void> {
  const ctx = await request.newContext();
  try {
    // Buscar tokens ativos do CPF - retorna um único token ou null
    const res = await ctx.get(`${ENV.apiUrl}/tokens/cpf/${ENV.cpf}`);
    if (res.ok()) {
      const data = await res.json();
      
      // Pode ser um único objeto ou um array
      const tokens = Array.isArray(data) ? data : (data ? [data] : []);
      
      // Revogar cada token ativo
      for (const t of tokens) {
        if (t && t.active && t.id) {
          await ctx.delete(`${ENV.apiUrl}/tokens/${t.id}`);
        }
      }
    }
  } catch (e) {
    // Ignorar erros - pode não haver tokens para revogar
    console.log("Nenhum token para revogar ou erro ao buscar:", e);
  } finally {
    await ctx.dispose();
  }
}
