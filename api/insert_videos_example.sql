-- Inserir vídeos de exemplo para o Bootcamp FLAME

-- Limpar dados existentes (opcional, remova se quiser manter os existentes)
-- DELETE FROM video_lessons;

-- Vídeo de Boas-Vindas (Página Inicial)
INSERT INTO video_lessons (
    module_number, lesson_number, title, description, 
    youtube_url, duration_minutes, order_index, 
    is_published, page_location, created_at, updated_at
) VALUES (
    0, 0, 
    'Bem-vindo ao Bootcamp FLAME', 
    'Vídeo de boas-vindas e apresentação do bootcamp. Conheça a metodologia, estrutura do curso e como aproveitar ao máximo sua jornada.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    15, 0, true, 'inicio',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Módulo 0 - Aula 1: Bem-vindo ao Jogo Real
INSERT INTO video_lessons (
    module_number, lesson_number, title, description,
    youtube_url, duration_minutes, order_index,
    is_published, page_location, created_at, updated_at
) VALUES (
    0, 1,
    'Bem-vindo ao Jogo Real',
    'Aqui você não aprende tecnologia. Você aprende a construir sistemas.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    8, 1, true, 'aulas',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Módulo 0 - Aula 2: Mentalidade de Desenvolvedor
INSERT INTO video_lessons (
    module_number, lesson_number, title, description,
    youtube_url, duration_minutes, order_index,
    is_published, page_location, created_at, updated_at
) VALUES (
    0, 2,
    'Mentalidade de Desenvolvedor',
    'Como pensar como um desenvolvedor profissional e resolver problemas complexos.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    12, 2, true, 'aulas',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Módulo 1 - Aula 1: Fundamentos de Java
INSERT INTO video_lessons (
    module_number, lesson_number, title, description,
    youtube_url, duration_minutes, order_index,
    is_published, page_location, created_at, updated_at
) VALUES (
    1, 1,
    'Fundamentos de Java',
    'Introdução à linguagem Java: variáveis, tipos de dados e estruturas básicas.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    20, 3, true, 'aulas',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Módulo 1 - Aula 2: Orientação a Objetos
INSERT INTO video_lessons (
    module_number, lesson_number, title, description,
    youtube_url, duration_minutes, order_index,
    is_published, page_location, created_at, updated_at
) VALUES (
    1, 2,
    'Orientação a Objetos',
    'Conceitos fundamentais de POO: classes, objetos, herança e polimorfismo.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    25, 4, true, 'aulas',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Verificar se os vídeos foram inseridos
SELECT 
    id,
    module_number as modulo,
    lesson_number as aula,
    title as titulo,
    page_location as pagina,
    is_published as publicado,
    created_at as criado_em
FROM video_lessons
ORDER BY module_number, lesson_number;
