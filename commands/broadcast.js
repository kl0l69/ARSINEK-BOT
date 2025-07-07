// أمر /broadcast
// بيبعت رسالة لكل الناس

module.exports = {
  name: 'broadcast',
  description: 'يبعت رسالة لكل الناس',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب الرسالة بعد الأمر');
    const message = args.join(' ');
    const chats = await client.getChats();
    for (let chat of chats) {
      if (chat.isGroup) continue;
      await chat.sendMessage(message);
    }
    msg.reply('تم إرسال الرسالة لكل الناس');
    logger.info(`/broadcast استخدم بواسطة ${msg.author}`);
  }
};
