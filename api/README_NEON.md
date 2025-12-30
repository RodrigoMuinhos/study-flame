# Neon AWS Quest setup

1) Defina variáveis de ambiente antes de subir a API (dev/prod):

```
DATABASE_URL=jdbc:postgresql://ep-empty-silence-ahklwo2k-pooler.c-3.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=npg_J6gfv1uUQMLy&sslmode=require&channelBinding=require
JPA_DDL_AUTO=update
```

2) Rode o script SQL para criar a tabela nova e remover as antigas (opcional se Hibernate já criar automaticamente):

```
psql "$DATABASE_URL" -f src/main/resources/db/aws_quest_tables.sql
```

3) Endpoints ativos:
- POST /api/aws-questions/import — importa temas e contagem.
- GET  /api/aws-questions/stats  — lista contagem por tema.

4) Conferência:
- Verifique no Neon a tabela `aws_question_themes` no schema `public`.
- `exam_questions` e `question_options` devem ser removidas após o script.

5) Frontend:
- Usa `NEXT_PUBLIC_API_URL` para chamar `/aws-questions/import` e `/aws-questions/stats`.