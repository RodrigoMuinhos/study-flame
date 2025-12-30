# SQL para Inserir Vídeo de Boas-Vindas

## Inserir vídeo de boas-vindas na página inicial

Execute este SQL no seu banco de dados PostgreSQL para adicionar um vídeo de boas-vindas:

```sql
-- Inserir vídeo de boas-vindas (página inicial)
INSERT INTO video_lessons (
    module_number, 
    lesson_number, 
    title, 
    description, 
    youtube_url, 
    duration_minutes, 
    order_index, 
    is_published, 
    page_location,
    created_at,
    updated_at
) VALUES (
    0, -- módulo 0 (introdução)
    0, -- lição 0 (boas-vindas)
    'Bem-vindo ao Bootcamp FLAME', 
    'Vídeo de boas-vindas e apresentação do bootcamp. Conheça a metodologia, estrutura do curso e como aproveitar ao máximo sua jornada.', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- SUBSTITUIR pelo link real
    15, -- duração em minutos
    0, -- ordem
    true, -- publicado
    'inicio', -- página de localização
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT DO NOTHING;

-- Verificar se foi inserido
SELECT * FROM video_lessons WHERE page_location = 'inicio';
```

## Inserir vídeo de exemplo para módulo 0, lição 1 (primeira aula)

```sql
-- Inserir primeira aula
INSERT INTO video_lessons (
    module_number, 
    lesson_number, 
    title, 
    description, 
    youtube_url, 
    duration_minutes, 
    order_index, 
    is_published, 
    page_location,
    created_at,
    updated_at
) VALUES (
    0, -- módulo 0 (introdução)
    1, -- lição 1
    'Configurando o Ambiente de Desenvolvimento', 
    'Aprenda a configurar seu ambiente de desenvolvimento com todas as ferramentas necessárias para o bootcamp.', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- SUBSTITUIR pelo link real
    25, -- duração em minutos
    1, -- ordem
    true, -- publicado
    'aulas', -- página de localização
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT DO NOTHING;

-- Verificar
SELECT * FROM video_lessons WHERE module_number = 0 AND lesson_number = 1;
```

## Listar todos os vídeos

```sql
SELECT 
    id,
    module_number,
    lesson_number,
    title,
    page_location,
    is_published,
    created_at
FROM video_lessons
ORDER BY module_number, lesson_number;
```

## IMPORTANTE

**Substitua os links do YouTube pelos vídeos reais do seu canal antes de executar!**

Link atual de exemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

Formato aceito:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
