// أمر /all
// بينشن كل الناس في الجروب

module.exports = {
  name: 'all',
  description: 'منشن لكل الأعضاء',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    const chat = await msg.getChat();
    let text = '@everyone';
    let mentions = [];
    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);
      mentions.push(contact);
      text += ` @${contact.number}`;
    }
    await chat.sendMessage(text, { mentions });
    logger.info(`/all استخدم بواسطة ${msg.author}`);
  }
};
