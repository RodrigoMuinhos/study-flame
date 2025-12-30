// Script Node.js para converter practitionerQuestions.ts em arquivos JSON separados
// Execute: node scripts/convert-questions.js

const fs = require('fs');
const path = require('path');

// Importa as questões (ajuste o caminho se necessário)
const { practitionerQuestions } = require('../src/data/practitionerQuestions.ts');

const outputDir = path.join(__dirname, '..', 'public', 'questions');

// Cria o diretório se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Converte cada tópico em arquivo JSON separado
Object.entries(practitionerQuestions).forEach(([topic, questions]) => {
  const fileName = `${topic}.json`;
  const filePath = path.join(outputDir, fileName);
  
  // Remove propriedades desnecessárias e padroniza
  const cleanQuestions = questions.map(q => ({
    id: q.id,
    topic: q.topic,
    question: q.question,
    context: q.context || '',
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    relatedService: q.relatedService || q.topic
  }));
  
  fs.writeFileSync(
    filePath,
    JSON.stringify(cleanQuestions, null, 2),
    'utf-8'
  );
  
  console.log(`✅ Created ${fileName} with ${cleanQuestions.length} questions`);
});

console.log('\n🎉 Conversion complete!');
