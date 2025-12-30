-- Migration: Criar tabelas de progresso e badges
-- Data: 2024-12-29

-- Tabela de Progresso dos Alunos
CREATE TABLE IF NOT EXISTS student_progress (
    id BIGSERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    current_module INTEGER NOT NULL DEFAULT 0,
    completed_modules INTEGER NOT NULL DEFAULT 0,
    total_xp INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cpf)
);

-- Tabela de Badges Disponíveis
CREATE TABLE IF NOT EXISTS badges (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    required_xp INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Badges dos Alunos
CREATE TABLE IF NOT EXISTS student_badges (
    id BIGSERIAL PRIMARY KEY,
    student_cpf VARCHAR(11) NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE(student_cpf, badge_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_student_progress_cpf ON student_progress(cpf);
CREATE INDEX IF NOT EXISTS idx_badges_code ON badges(code);
CREATE INDEX IF NOT EXISTS idx_student_badges_cpf ON student_badges(student_cpf);
CREATE INDEX IF NOT EXISTS idx_student_badges_badge ON student_badges(badge_id);

-- Comentários
COMMENT ON TABLE student_progress IS 'Progresso individual de cada aluno';
COMMENT ON TABLE badges IS 'Badges e conquistas disponíveis no sistema';
COMMENT ON TABLE student_badges IS 'Badges conquistados pelos alunos';
