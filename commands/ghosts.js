// أمر /ghosts
// بيجيب الناس اللي مش بتشارك
const { getGhosts } = require('../utils/analytics');

module.exports = {
  name: 'ghosts',
  description: 'الناس اللي مش بتشارك',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    const ghosts = getGhosts(chat.id._serialized);
    if (ghosts.length === 0) return msg.reply('كل الناس بتشارك!');
    let text = 'الناس اللي مش بتشارك:\n';
    ghosts.forEach(u => text += `@${u.split('@')[0]} `);
    await chat.sendMessage(text);
    logger.info(`/ghosts استخدم بواسطة ${msg.author}`);
  }
};
