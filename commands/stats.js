// أمر /stats
// أكتر شخص بيشارك
const { logMessage } = require('../utils/analytics');
const fs = require('fs');
const path = require('path');
const analyticsPath = path.join(__dirname, '../data/analytics.json');

function loadAnalytics() {
  if (!fs.existsSync(analyticsPath)) return {};
  return JSON.parse(fs.readFileSync(analyticsPath));
}

module.exports = {
  name: 'stats',
  description: 'أكتر شخص بيشارك',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    const data = loadAnalytics();
    if (!data[chat.id._serialized]) return msg.reply('مفيش بيانات كفاية');
    const users = data[chat.id._serialized].users || {};
    const sorted = Object.entries(users).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return msg.reply('مفيش مشاركات');
    let text = 'أكتر ناس مشاركة:\n';
    sorted.slice(0, 5).forEach(([user, count]) => {
      text += `@${user.split('@')[0]}: ${count} رسالة\n`;
    });
    await chat.sendMessage(text);
    logger.info(`/stats استخدم بواسطة ${msg.author}`);
  }
};
