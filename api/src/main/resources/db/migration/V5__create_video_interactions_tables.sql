-- Migration: Adicionar tabelas de interação com vídeos
-- Data: 2024-12-29

-- Tabela de curtidas
CREATE TABLE IF NOT EXISTS video_likes (
    id BIGSERIAL PRIMARY KEY,
    video_lesson_id BIGINT NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_lesson_id) REFERENCES video_lessons(id) ON DELETE CASCADE,
    UNIQUE(video_lesson_id, student_cpf)
);

-- Tabela de comentários
CREATE TABLE IF NOT EXISTS video_comments (
    id BIGSERIAL PRIMARY KEY,
    video_lesson_id BIGINT NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    comment TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_lesson_id) REFERENCES video_lessons(id) ON DELETE CASCADE
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS video_ratings (
    id BIGSERIAL PRIMARY KEY,
    video_lesson_id BIGINT NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    content_rating INTEGER NOT NULL CHECK (content_rating BETWEEN 1 AND 5),
    audio_rating INTEGER NOT NULL CHECK (audio_rating BETWEEN 1 AND 5),
    video_quality_rating INTEGER NOT NULL CHECK (video_quality_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_lesson_id) REFERENCES video_lessons(id) ON DELETE CASCADE,
    UNIQUE(video_lesson_id, student_cpf)
);

-- Tabela de progresso de visualização
CREATE TABLE IF NOT EXISTS video_watch_progress (
    id BIGSERIAL PRIMARY KEY,
    video_lesson_id BIGINT NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    watched_seconds INTEGER NOT NULL DEFAULT 0,
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (video_lesson_id) REFERENCES video_lessons(id) ON DELETE CASCADE,
    UNIQUE(video_lesson_id, student_cpf)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_video_likes_lesson ON video_likes(video_lesson_id);
CREATE INDEX IF NOT EXISTS idx_video_likes_student ON video_likes(student_cpf);
CREATE INDEX IF NOT EXISTS idx_video_comments_lesson ON video_comments(video_lesson_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_student ON video_comments(student_cpf);
CREATE INDEX IF NOT EXISTS idx_video_ratings_lesson ON video_ratings(video_lesson_id);
CREATE INDEX IF NOT EXISTS idx_video_ratings_student ON video_ratings(student_cpf);
CREATE INDEX IF NOT EXISTS idx_video_progress_lesson ON video_watch_progress(video_lesson_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_student ON video_watch_progress(student_cpf);
CREATE INDEX IF NOT EXISTS idx_video_progress_completed ON video_watch_progress(completed);

-- Comentários nas tabelas
COMMENT ON TABLE video_likes IS 'Curtidas dos alunos em vídeos';
COMMENT ON TABLE video_comments IS 'Comentários dos alunos em vídeos';
COMMENT ON TABLE video_ratings IS 'Avaliações dos alunos para qualidade dos vídeos';
COMMENT ON TABLE video_watch_progress IS 'Progresso de visualização dos vídeos pelos alunos';
