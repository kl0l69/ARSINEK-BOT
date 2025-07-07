// أمر /kick
// بيطرد حد من الجروب

module.exports = {
  name: 'kick',
  description: 'يطرد حد من الجروب',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    if (!msg.hasQuotedMsg && args.length === 0) return msg.reply('حدد مين اللي عايز تطرده');
    const chat = await msg.getChat();
    if (!chat.isGroup) return msg.reply('الأمر ده للجروبات بس');
    let userId;
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      userId = quotedMsg.author || quotedMsg.from;
    } else {
      userId = args[0].replace('@', '').replace(/\D/g, '') + '@c.us';
    }
    try {
      await chat.removeParticipants([userId]);
      msg.reply('تم طرده من الجروب');
      logger.info(`/kick استخدم بواسطة ${msg.author} لطرد ${userId}`);
    } catch (err) {
      msg.reply('مش قادر أطرده. ممكن يكون أدمن أو فيه مشكلة');
      logger.error('مشكلة في /kick: ' + err);
    }
  }
};
