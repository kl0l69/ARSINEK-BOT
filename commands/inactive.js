// أمر /inactive
// الناس الساكتين
const { getGhosts } = require('../utils/analytics');

module.exports = {
  name: 'inactive',
  description: 'الناس الساكتين',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    const ghosts = getGhosts(chat.id._serialized);
    if (ghosts.length === 0) return msg.reply('كل الناس بتشارك!');
    let text = 'الناس الساكتين:\n';
    ghosts.forEach(u => text += `@${u.split('@')[0]} `);
    await chat.sendMessage(text);
    logger.info(`/inactive استخدم بواسطة ${msg.author}`);
  }
};
