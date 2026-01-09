-- Migration: regras de XP para AWS Study (100% via banco)
-- Data: 2026-01-08

-- Regras usadas no AWS Study (provas/treinos). Valores podem ser ajustados via DB.
INSERT INTO gamification_xp_rules (action_code, xp_amount, description)
VALUES
  ('AWS_EXAM_CORRECT_ANSWER', 2, 'XP por resposta correta em simulado AWS (multiplica pela quantidade de acertos)'),
  ('AWS_EXAM_PASSED', 5, 'XP bônus ao passar no simulado AWS (>= 72%)'),
  ('AWS_EXAM_EXCELLENT_90', 5, 'XP bônus por excelência (>= 90%) no simulado AWS'),
  ('AWS_EXAM_EXCELLENT_95', 10, 'XP bônus por excelência (>= 95%) no simulado AWS')
ON CONFLICT (action_code) DO NOTHING;
