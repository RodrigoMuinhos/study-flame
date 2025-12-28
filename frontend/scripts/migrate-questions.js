const fs = require('fs');
const path = require('path');

// Função para converter questões para formato da API
function convertQuestionsToAPI(questions) {
  return questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: Array.isArray(q.correctAnswer) 
      ? q.correctAnswer.join(',') 
      : q.correctAnswer.toString(),
    explanation: q.explanation,
    domain: q.domain,
    difficulty: q.difficulty,
    multipleChoice: q.multipleChoice || false
  }));
}

// Função para enviar questões em lote
async function uploadQuestions(questions, batchName) {
  const apiUrl = 'http://localhost:8080/api/exam-questions/bulk';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questions)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`✅ ${batchName} - ${result.count} questões salvas com sucesso`);
    return result;
  } catch (error) {
    console.error(`❌ Erro ao enviar ${batchName}:`, error.message);
    throw error;
  }
}

// Função principal
async function migrateAllQuestions() {
  console.log('🚀 Iniciando migração de questões para o banco Neon...\n');
  
  try {
    // Importar os bancos de questões
    const bank1Module = await import('../src/data/examQuestionsBank1.js');
    const bank2Module = await import('../src/data/examQuestionsBank2.js');
    const bank3Module = await import('../src/data/examQuestionsBank3.js');
    
    const bank1 = bank1Module.examQuestionsBank1;
    const bank2 = bank2Module.examQuestionsBank2;
    const bank3 = bank3Module.examQuestionsBank3;
    
    // Converter para formato da API
    const questions1 = convertQuestionsToAPI(bank1);
    const questions2 = convertQuestionsToAPI(bank2);
    const questions3 = convertQuestionsToAPI(bank3);
    
    // Enviar em lotes
    console.log(`📦 Banco 1: ${questions1.length} questões`);
    await uploadQuestions(questions1, 'Banco 1');
    
    console.log(`📦 Banco 2: ${questions2.length} questões`);
    await uploadQuestions(questions2, 'Banco 2');
    
    console.log(`📦 Banco 3: ${questions3.length} questões`);
    await uploadQuestions(questions3, 'Banco 3');
    
    const total = questions1.length + questions2.length + questions3.length;
    console.log(`\n✨ Migração concluída! Total: ${total} questões no banco Neon`);
    
  } catch (error) {
    console.error('\n❌ Erro na migração:', error.message);
    process.exit(1);
  }
}

// Executar migração
migrateAllQuestions();
