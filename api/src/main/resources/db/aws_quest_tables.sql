-- Cria tabela nova para temas e banco de questões AWS Quest
CREATE TABLE IF NOT EXISTS aws_question_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme TEXT NOT NULL UNIQUE,
    question_count INT NOT NULL DEFAULT 0,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_aws_question_themes_updated_at'
  ) THEN
    CREATE TRIGGER trg_aws_question_themes_updated_at
    BEFORE UPDATE ON aws_question_themes
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;

-- Remove tabelas antigas não usadas
DROP TABLE IF EXISTS exam_questions CASCADE;
DROP TABLE IF EXISTS question_options CASCADE;