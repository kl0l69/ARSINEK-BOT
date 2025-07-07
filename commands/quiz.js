// أمر /quiz
// بيبعت سؤال اختيار من متعدد
const fs = require('fs');
const path = require('path');
const quizPath = path.join(__dirname, '../data/quiz.json');

function loadQuiz() {
  if (!fs.existsSync(quizPath)) return [];
  return JSON.parse(fs.readFileSync(quizPath));
}

module.exports = {
  name: 'quiz',
  description: 'سؤال اختيار من متعدد',
  async execute(client, msg, args, logger) {
    const quizList = loadQuiz();
    if (quizList.length === 0) return msg.reply('مفيش أسئلة متاحة');
    const q = quizList[Math.floor(Math.random() * quizList.length)];
    let text = `❓ ${q.question}\n`;
    q.options.forEach((opt, i) => {
      text += `${i + 1}. ${opt}\n`;
    });
    msg.reply(text);
    logger.info(`/quiz استخدم بواسطة ${msg.author}`);
  }
};
