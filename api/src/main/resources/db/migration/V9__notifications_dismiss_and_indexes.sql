-- Migration: Notificações (dismiss por aluno) + índices
-- Data: 2026-01-09

-- Tabelas podem ter sido criadas via ddl-auto em alguns ambientes.
-- Esta migration torna a estrutura idempotente e garante a coluna dismissed_at.

CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    icon VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notification_reads (
    id BIGSERIAL PRIMARY KEY,
    notification_id BIGINT NOT NULL,
    student_cpf VARCHAR(20) NOT NULL,
    read_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dismissed_at TIMESTAMP NULL,
    CONSTRAINT uk_notification_read UNIQUE (notification_id, student_cpf),
    CONSTRAINT fk_notification_reads_notification_id FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE
);

ALTER TABLE notification_reads
    ADD COLUMN IF NOT EXISTS dismissed_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notification_reads_student_cpf ON notification_reads(student_cpf);
CREATE INDEX IF NOT EXISTS idx_notification_reads_notification_id ON notification_reads(notification_id);
