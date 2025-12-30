-- Migration: Adicionar tabelas de interação com questões de exame
-- Data: 2025-12-29
-- Descrição: Curtidas, comentários e avaliações para questões de exame

-- Tabela de curtidas nas questões
CREATE TABLE IF NOT EXISTS question_likes (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(question_id, student_cpf)
);

-- Tabela de comentários nas questões
CREATE TABLE IF NOT EXISTS question_comments (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    comment TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    is_helpful BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de curtidas em comentários
CREATE TABLE IF NOT EXISTS comment_likes (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES question_comments(id) ON DELETE CASCADE,
    UNIQUE(comment_id, student_cpf)
);

-- Tabela de avaliações de dificuldade e qualidade das questões
CREATE TABLE IF NOT EXISTS question_ratings (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    difficulty_rating INTEGER NOT NULL CHECK (difficulty_rating BETWEEN 1 AND 5),
    quality_rating INTEGER NOT NULL CHECK (quality_rating BETWEEN 1 AND 5),
    explanation_rating INTEGER NOT NULL CHECK (explanation_rating BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(question_id, student_cpf)
);

-- Tabela de respostas marcadas para revisão
CREATE TABLE IF NOT EXISTS question_bookmarks (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(question_id, student_cpf)
);

-- Tabela de estatísticas de resposta das questões
CREATE TABLE IF NOT EXISTS question_stats (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL UNIQUE,
    total_attempts INTEGER NOT NULL DEFAULT 0,
    correct_attempts INTEGER NOT NULL DEFAULT 0,
    incorrect_attempts INTEGER NOT NULL DEFAULT 0,
    average_time_seconds INTEGER NOT NULL DEFAULT 0,
    total_likes INTEGER NOT NULL DEFAULT 0,
    total_comments INTEGER NOT NULL DEFAULT 0,
    average_difficulty DECIMAL(3,2) NOT NULL DEFAULT 0,
    average_quality DECIMAL(3,2) NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_question_likes_question ON question_likes(question_id);
CREATE INDEX IF NOT EXISTS idx_question_likes_student ON question_likes(student_cpf);
CREATE INDEX IF NOT EXISTS idx_question_comments_question ON question_comments(question_id);
CREATE INDEX IF NOT EXISTS idx_question_comments_student ON question_comments(student_cpf);
CREATE INDEX IF NOT EXISTS idx_question_comments_created ON question_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_question_ratings_question ON question_ratings(question_id);
CREATE INDEX IF NOT EXISTS idx_question_bookmarks_student ON question_bookmarks(student_cpf);
CREATE INDEX IF NOT EXISTS idx_question_stats_question ON question_stats(question_id);

-- Trigger para atualizar contador de curtidas em comentários
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE question_comments 
        SET likes = likes + 1 
        WHERE id = NEW.comment_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE question_comments 
        SET likes = likes - 1 
        WHERE id = OLD.comment_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_comment_likes
    AFTER INSERT OR DELETE ON comment_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_likes_count();

-- Trigger para atualizar estatísticas das questões
CREATE OR REPLACE FUNCTION update_question_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO question_stats (question_id, total_likes, total_comments, updated_at)
        VALUES (NEW.question_id, 0, 0, CURRENT_TIMESTAMP)
        ON CONFLICT (question_id) DO NOTHING;
    END IF;
    
    -- Atualizar contadores
    IF TG_TABLE_NAME = 'question_likes' THEN
        UPDATE question_stats
        SET total_likes = (SELECT COUNT(*) FROM question_likes WHERE question_id = NEW.question_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE question_id = NEW.question_id;
    ELSIF TG_TABLE_NAME = 'question_comments' THEN
        UPDATE question_stats
        SET total_comments = (SELECT COUNT(*) FROM question_comments WHERE question_id = NEW.question_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE question_id = NEW.question_id;
    ELSIF TG_TABLE_NAME = 'question_ratings' THEN
        UPDATE question_stats
        SET average_difficulty = (SELECT AVG(difficulty_rating) FROM question_ratings WHERE question_id = NEW.question_id),
            average_quality = (SELECT AVG(quality_rating) FROM question_ratings WHERE question_id = NEW.question_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE question_id = NEW.question_id;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_question_stats_likes
    AFTER INSERT OR DELETE ON question_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_question_stats();

CREATE TRIGGER trigger_update_question_stats_comments
    AFTER INSERT OR DELETE ON question_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_question_stats();

CREATE TRIGGER trigger_update_question_stats_ratings
    AFTER INSERT OR UPDATE ON question_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_question_stats();

-- Comentários nas tabelas
COMMENT ON TABLE question_likes IS 'Armazena curtidas dos alunos nas questões';
COMMENT ON TABLE question_comments IS 'Armazena comentários dos alunos nas questões';
COMMENT ON TABLE comment_likes IS 'Armazena curtidas em comentários';
COMMENT ON TABLE question_ratings IS 'Armazena avaliações de dificuldade e qualidade das questões';
COMMENT ON TABLE question_bookmarks IS 'Armazena questões marcadas pelos alunos para revisão';
COMMENT ON TABLE question_stats IS 'Armazena estatísticas agregadas das questões';
