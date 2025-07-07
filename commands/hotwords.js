// أمر /hotwords
// أكتر كلمات اتكررت في الجروب
const { getHotWords } = require('../utils/analytics');

module.exports = {
  name: 'hotwords',
  description: 'أكتر كلمات اتكررت',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    const hotwords = getHotWords(chat.id._serialized);
    if (hotwords.length === 0) return msg.reply('مفيش بيانات كفاية');
    let text = 'أكتر كلمات اتقالت:\n';
    hotwords.forEach(([word, count]) => text += `${word}: ${count}\n`);
    msg.reply(text);
    logger.info(`/hotwords استخدم بواسطة ${msg.author}`);
  }
};
