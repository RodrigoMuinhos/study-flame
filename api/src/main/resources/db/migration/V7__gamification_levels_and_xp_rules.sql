-- Migration: Gamification (níveis + regras de XP) 100% via banco
-- Data: 2026-01-08

-- =====================
-- 1) Video lessons: XP por aula
-- =====================
ALTER TABLE video_lessons
    ADD COLUMN IF NOT EXISTS xp_reward INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN video_lessons.xp_reward IS 'XP concedido quando a aula for concluída (regra 100% via DB)';

-- =====================
-- 2) Tabelas de configuração/níveis
-- =====================
CREATE TABLE IF NOT EXISTS gamification_config (
    id BIGSERIAL PRIMARY KEY,
    total_levels INTEGER NOT NULL,
    total_xp_max INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(total_levels)
);

CREATE TABLE IF NOT EXISTS gamification_levels (
    id BIGSERIAL PRIMARY KEY,
    level_number INTEGER NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    min_xp INTEGER NOT NULL,
    max_xp INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gamification_levels_level_number ON gamification_levels(level_number);
CREATE INDEX IF NOT EXISTS idx_gamification_levels_range ON gamification_levels(min_xp, max_xp);

-- Regras de XP por ação (ex.: curtir/comentar/avaliar)
CREATE TABLE IF NOT EXISTS gamification_xp_rules (
    id BIGSERIAL PRIMARY KEY,
    action_code VARCHAR(60) NOT NULL UNIQUE,
    xp_amount INTEGER NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gamification_xp_rules_action_code ON gamification_xp_rules(action_code);

-- =====================
-- 3) Compatibilização (tabelas existentes x entidades JPA atuais)
-- =====================

-- student_progress: alguns ambientes foram criados por migrations antigas; adicionamos colunas usadas pelo código atual.
ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS lead_id UUID;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS xp_total INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS level INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS streak_days INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS lessons_completed INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS exercises_completed INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS perfect_scores INTEGER;

ALTER TABLE student_progress
    ADD COLUMN IF NOT EXISTS study_hours DOUBLE PRECISION;

-- defaults (seguro e idempotente)
UPDATE student_progress SET xp_total = 0 WHERE xp_total IS NULL;
UPDATE student_progress SET level = 1 WHERE level IS NULL;
UPDATE student_progress SET streak_days = 0 WHERE streak_days IS NULL;
UPDATE student_progress SET lessons_completed = 0 WHERE lessons_completed IS NULL;
UPDATE student_progress SET exercises_completed = 0 WHERE exercises_completed IS NULL;
UPDATE student_progress SET perfect_scores = 0 WHERE perfect_scores IS NULL;
UPDATE student_progress SET study_hours = 0 WHERE study_hours IS NULL;

-- badges: adicionar colunas esperadas pela entidade atual
ALTER TABLE badges
    ADD COLUMN IF NOT EXISTS rarity VARCHAR(20);

ALTER TABLE badges
    ADD COLUMN IF NOT EXISTS max_progress INTEGER;

ALTER TABLE badges
    ADD COLUMN IF NOT EXISTS xp_reward INTEGER;

ALTER TABLE badges
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN;

UPDATE badges SET rarity = 'COMMON' WHERE rarity IS NULL;
UPDATE badges SET is_active = TRUE WHERE is_active IS NULL;
UPDATE badges SET xp_reward = 0 WHERE xp_reward IS NULL;

-- student_badges: adicionar colunas esperadas pela entidade atual
ALTER TABLE student_badges
    ADD COLUMN IF NOT EXISTS lead_id UUID;

ALTER TABLE student_badges
    ADD COLUMN IF NOT EXISTS unlocked BOOLEAN;

ALTER TABLE student_badges
    ADD COLUMN IF NOT EXISTS progress INTEGER;

UPDATE student_badges SET unlocked = FALSE WHERE unlocked IS NULL;
UPDATE student_badges SET progress = 0 WHERE progress IS NULL;

-- =====================
-- 4) Seeds (tudo no DB; código não hardcode)
-- =====================

-- Config principal: 13 níveis e 100000 XP total
INSERT INTO gamification_config (total_levels, total_xp_max)
VALUES (13, 100000)
ON CONFLICT (total_levels) DO NOTHING;

-- Níveis 1..13 distribuídos em faixas dentro de 0..100000
-- Regra: faixas de ~7692 XP (último fecha em 100000)
INSERT INTO gamification_levels (level_number, title, min_xp, max_xp)
VALUES
  (1,  'Nível 1',   0,     7692),
  (2,  'Nível 2',   7692,  15384),
  (3,  'Nível 3',   15384, 23076),
  (4,  'Nível 4',   23076, 30768),
  (5,  'Nível 5',   30768, 38460),
  (6,  'Nível 6',   38460, 46152),
  (7,  'Nível 7',   46152, 53844),
  (8,  'Nível 8',   53844, 61536),
  (9,  'Nível 9',   61536, 69228),
  (10, 'Nível 10',  69228, 76920),
  (11, 'Nível 11',  76920, 84612),
  (12, 'Nível 12',  84612, 92304),
  (13, 'Nível 13',  92304, 100000)
ON CONFLICT (level_number) DO NOTHING;

-- Regras de XP por ação (além da conclusão de aula que usa video_lessons.xp_reward)
INSERT INTO gamification_xp_rules (action_code, xp_amount, description)
VALUES
  ('VIDEO_LIKED', 2, 'XP ao curtir uma aula (apenas no like, não no unlike)'),
  ('COMMENT_CREATED', 5, 'XP ao comentar em uma aula'),
  ('RATING_SUBMITTED', 3, 'XP ao enviar avaliação (apenas no primeiro envio)')
ON CONFLICT (action_code) DO NOTHING;

-- Badges padrão (opcional): criados no DB para evitar hardcode em código.
INSERT INTO badges (code, name, description, icon, rarity, max_progress, xp_reward, is_active)
VALUES
  ('FIRST_LESSON', 'Primeira Aula', 'Complete sua primeira aula', '🎯', 'COMMON', 1, 50, TRUE),
  ('MARATHONER', 'Maratonista', 'Assista 10 horas de aulas em uma semana', '🏃', 'RARE', 10, 100, TRUE),
  ('PERFECTIONIST', 'Perfeccionista', 'Tire 100% em 5 exercícios consecutivos', '💯', 'EPIC', 5, 200, TRUE),
  ('CODE_LEGEND', 'Lenda do Código', 'Complete 50 aulas avançadas', '👑', 'LEGENDARY', 50, 500, TRUE),
  ('MENTOR', 'Mentor', 'Ajude 10 colegas na comunidade', '🎓', 'RARE', 10, 100, TRUE),
  ('FIRE_STREAK', 'Sequência de Fogo', 'Mantenha uma sequência de 30 dias', '🔥', 'EPIC', 30, 300, TRUE)
ON CONFLICT (code) DO NOTHING;
