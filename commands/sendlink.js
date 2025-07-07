// أمر /sendlink "رابط" to "team devs"
// بيبعت لينك لفئة معينة

module.exports = {
  name: 'sendlink',
  description: 'يبعت لينك لفئة معينة',
  async execute(client, msg, args, logger) {
    const link = args[0]?.replace(/"/g, '');
    if (!link || args[1] !== 'to' || !args[2]) return msg.reply('اكتب: /sendlink "رابط" to "اسم الفئة"');
    const groupName = args.slice(2).join(' ').replace(/"/g, '');
    const chats = await client.getChats();
    const group = chats.find(c => c.isGroup && c.name === groupName);
    if (!group) return msg.reply('الجروب مش موجود');
    await group.sendMessage(link);
    msg.reply('تم إرسال اللينك للجروب');
    logger.info(`/sendlink استخدم بواسطة ${msg.author} لفئة ${groupName}`);
  }
};
