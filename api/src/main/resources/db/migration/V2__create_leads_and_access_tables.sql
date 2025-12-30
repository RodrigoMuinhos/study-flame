-- Migration: Criar tabelas de leads e acessos
-- Data: 2024-12-29

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(2),
    status VARCHAR(20) NOT NULL DEFAULT 'NOVO',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Acessos dos Alunos
CREATE TABLE IF NOT EXISTS student_access (
    id BIGSERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    has_access BOOLEAN NOT NULL DEFAULT true,
    access_granted_at TIMESTAMP,
    access_revoked_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tokens de Acesso (para recursos especiais como AWS Study)
CREATE TABLE IF NOT EXISTS access_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(20) NOT NULL UNIQUE,
    resource_type VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    max_uses INTEGER,
    current_uses INTEGER NOT NULL DEFAULT 0,
    valid_until TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_cpf ON leads(cpf);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_student_access_cpf ON student_access(cpf);
CREATE INDEX IF NOT EXISTS idx_access_tokens_token ON access_tokens(token);
CREATE INDEX IF NOT EXISTS idx_access_tokens_resource ON access_tokens(resource_type);

-- Comentários
COMMENT ON TABLE leads IS 'Leads captados pelo sistema';
COMMENT ON TABLE student_access IS 'Controle de acesso dos alunos ao sistema';
COMMENT ON TABLE access_tokens IS 'Tokens de acesso para recursos especiais';
