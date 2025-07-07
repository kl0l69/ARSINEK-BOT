// أمر /invite from group "اسم الجروب"
// بيبعت لينك دعوة من جروب تاني

module.exports = {
  name: 'invite',
  description: 'يبعت لينك دعوة من جروب تاني',
  async execute(client, msg, args, logger) {
    if (args[0] !== 'from' || args[1] !== 'group' || !args[2]) return msg.reply('اكتب: /invite from group "اسم الجروب"');
    const groupName = args.slice(2).join(' ').replace(/"/g, '');
    const chats = await client.getChats();
    const group = chats.find(c => c.isGroup && c.name === groupName);
    if (!group) return msg.reply('الجروب مش موجود');
    try {
      const code = await group.getInviteCode();
      msg.reply(`لينك الدعوة: https://chat.whatsapp.com/${code}`);
      logger.info(`/invite استخدم بواسطة ${msg.author} لجروب ${groupName}`);
    } catch (err) {
      msg.reply('مش قادر أجيب لينك الدعوة');
      logger.error('مشكلة في /invite: ' + err);
    }
  }
};
