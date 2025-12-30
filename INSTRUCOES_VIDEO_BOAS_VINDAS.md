# 📹 Como Configurar o Vídeo de Boas-Vindas

## Passo a Passo

### 1. Faça upload do seu vídeo no YouTube
- Grave e publique seu vídeo de boas-vindas no YouTube
- Copie o link do vídeo

### 2. Configure o link no código

Abra o arquivo:
```
frontend/src/app/components/StudentDashboard.tsx
```

Procure pela linha (aproximadamente linha 48):
```typescript
const WELCOME_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // ⬅️ SUBSTITUIR pelo seu vídeo
```

Substitua pelo link do seu vídeo:
```typescript
const WELCOME_VIDEO_URL = "https://www.youtube.com/watch?v=SEU_VIDEO_ID_AQUI";
```

### 3. Salve e reinicie o frontend

O vídeo aparecerá automaticamente na página inicial!

## ✅ Vantagens desta Solução

- ✅ **Sem banco de dados**: Não precisa inserir SQL
- ✅ **Simples**: Apenas trocar o link
- ✅ **Rápido**: Atualização imediata
- ✅ **Validado**: O fluxo já está funcionando

## 📝 Formatos de Link Aceitos

Qualquer um destes formatos funciona:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## 🎬 Para os Vídeos das Aulas

Os vídeos das aulas continuam sendo gerenciados pelo banco de dados, 
permitindo controle fino de módulos, lições e publicação.

Apenas o vídeo de boas-vindas da página inicial é configurado diretamente no código.
