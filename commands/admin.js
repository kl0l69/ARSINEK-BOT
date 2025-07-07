// أمر /admin
// بينشن الأدمنز بس

module.exports = {
  name: 'admin',
  description: 'منشن الأدمنز',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    let text = '@admins';
    let mentions = [];
    for (let participant of chat.participants) {
      if (participant.isAdmin) {
        const contact = await client.getContactById(participant.id._serialized);
        mentions.push(contact);
        text += ` @${contact.number}`;
      }
    }
    await chat.sendMessage(text, { mentions });
    logger.info(`/admin استخدم بواسطة ${msg.author}`);
  }
};
