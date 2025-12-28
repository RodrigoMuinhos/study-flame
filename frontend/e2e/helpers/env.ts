export const ENV = {
  baseUrl: process.env.E2E_BASE_URL || "http://localhost:3000",
  apiUrl: process.env.E2E_API_URL || "http://localhost:8080/api",
  cpf: process.env.E2E_TEST_CPF || "12345678900",
};
