// أمر /score
// بيعرض تقييم الطالب
const fs = require('fs');
const path = require('path');
const scorePath = path.join(__dirname, '../data/scores.json');

function loadScores() {
  if (!fs.existsSync(scorePath)) return {};
  return JSON.parse(fs.readFileSync(scorePath));
}

module.exports = {
  name: 'score',
  description: 'عرض التقييم',
  async execute(client, msg, args, logger) {
    const scores = loadScores();
    const user = msg.author || msg.from;
    const score = scores[user] || 0;
    msg.reply(`تقييمك: ${score}`);
    logger.info(`/score استخدم بواسطة ${user}`);
  }
};
