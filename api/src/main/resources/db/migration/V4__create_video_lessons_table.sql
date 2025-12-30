-- Migration: Criar tabela de videoaulas
-- Data: 2024-12-29

CREATE TABLE IF NOT EXISTS video_lessons (
    id BIGSERIAL PRIMARY KEY,
    module_number INTEGER NOT NULL,
    lesson_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    youtube_url VARCHAR(500) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT false,
    page_location VARCHAR(50) NOT NULL DEFAULT 'aulas',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(module_number, lesson_number)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_video_lessons_module ON video_lessons(module_number);
CREATE INDEX IF NOT EXISTS idx_video_lessons_published ON video_lessons(is_published);
CREATE INDEX IF NOT EXISTS idx_video_lessons_page ON video_lessons(page_location);
CREATE INDEX IF NOT EXISTS idx_video_lessons_order ON video_lessons(order_index);

-- Comentários
COMMENT ON TABLE video_lessons IS 'Videoaulas do bootcamp';
COMMENT ON COLUMN video_lessons.module_number IS 'Número do módulo (0-12)';
COMMENT ON COLUMN video_lessons.lesson_number IS 'Número da aula dentro do módulo';
COMMENT ON COLUMN video_lessons.page_location IS 'Onde a aula aparece: inicio, trilha, aulas, desafios, materiais';
