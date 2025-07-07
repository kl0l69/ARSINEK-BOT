// أمر /review
// بيسأل سؤال ويصحح الإجابة
const fs = require('fs');
const path = require('path');
const quizPath = path.join(__dirname, '../data/quiz.json');

function loadQuiz() {
  if (!fs.existsSync(quizPath)) return [];
  return JSON.parse(fs.readFileSync(quizPath));
}

module.exports = {
  name: 'review',
  description: 'مراجعة امتحانات',
  async execute(client, msg, args, logger) {
    const quizList = loadQuiz();
    if (quizList.length === 0) return msg.reply('مفيش أسئلة متاحة');
    const q = quizList[Math.floor(Math.random() * quizList.length)];
    let text = `مراجعة: ${q.question}\n`;
    q.options.forEach((opt, i) => {
      text += `${i + 1}. ${opt}\n`;
    });
    msg.reply(text + '\nرد برقم الإجابة');
    // التصحيح هيكون في أمر تاني أو في نفس الأمر لو فيه state
    logger.info(`/review استخدم بواسطة ${msg.author}`);
  }
};
