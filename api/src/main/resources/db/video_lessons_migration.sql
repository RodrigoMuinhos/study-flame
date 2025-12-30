-- Criar tabela de vídeos/aulas
CREATE TABLE IF NOT EXISTS video_lessons (
    id BIGSERIAL PRIMARY KEY,
    module_number INTEGER NOT NULL,
    lesson_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    youtube_url VARCHAR(500) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    page_location VARCHAR(50) NOT NULL DEFAULT 'aulas',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Índices para melhorar performance
    CONSTRAINT uk_module_lesson UNIQUE (module_number, lesson_number)
);

-- Criar índices
CREATE INDEX idx_video_lessons_module ON video_lessons(module_number);
CREATE INDEX idx_video_lessons_published ON video_lessons(is_published);
CREATE INDEX idx_video_lessons_page_location ON video_lessons(page_location);

-- Comentários
COMMENT ON TABLE video_lessons IS 'Tabela de vídeos e aulas do bootcamp';
COMMENT ON COLUMN video_lessons.module_number IS 'Número do módulo (0 = Preparação, 1 = Fundamentos, etc.)';
COMMENT ON COLUMN video_lessons.lesson_number IS 'Número da aula dentro do módulo';
COMMENT ON COLUMN video_lessons.youtube_url IS 'URL completa do vídeo no YouTube';
COMMENT ON COLUMN video_lessons.duration_minutes IS 'Duração do vídeo em minutos';
COMMENT ON COLUMN video_lessons.order_index IS 'Ordem de exibição (para casos especiais)';
COMMENT ON COLUMN video_lessons.is_published IS 'Se o vídeo está publicado e visível para alunos';
COMMENT ON COLUMN video_lessons.page_location IS 'Página onde o vídeo aparece (inicio, trilha, aulas, desafios, materiais)';

-- Inserir alguns vídeos de exemplo (opcional)
-- INSERT INTO video_lessons (module_number, lesson_number, title, description, youtube_url, duration_minutes, is_published, page_location)
-- VALUES 
--   (0, 1, 'Bem-vindo ao Bootcamp FLAME', 'Introdução ao bootcamp e apresentação da jornada', 'https://www.youtube.com/watch?v=EXAMPLE1', 8, true, 'inicio'),
--   (0, 2, 'Como Funciona Sua Jornada', 'Entenda a estrutura de módulos e o sistema de progressão', 'https://www.youtube.com/watch?v=EXAMPLE2', 10, true, 'aulas'),
--   (0, 3, 'Mentalidade para Aprender Programação', '5 verdades sobre o processo de aprendizado', 'https://www.youtube.com/watch?v=EXAMPLE3', 12, true, 'aulas');
