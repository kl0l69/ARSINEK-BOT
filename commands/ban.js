// أمر /ban
// بيمنع حد يدخل الجروب تاني
const fs = require('fs');
const path = require('path');
const bannedPath = path.join(__dirname, '../data/banned.json');

function loadBanned() {
  if (!fs.existsSync(bannedPath)) return [];
  return JSON.parse(fs.readFileSync(bannedPath));
}
function saveBanned(list) {
  fs.writeFileSync(bannedPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'ban',
  description: 'يمنع حد يدخل تاني',
  async execute(client, msg, args, logger) {
    if (!msg.isGroupMsg) return msg.reply('الأمر ده للجروبات بس');
    if (!msg.hasQuotedMsg && args.length === 0) return msg.reply('حدد مين اللي عايز تمنعه');
    let userId;
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      userId = quotedMsg.author || quotedMsg.from;
    } else {
      userId = args[0].replace('@', '').replace(/\D/g, '') + '@c.us';
    }
    let banned = loadBanned();
    if (!banned.includes(userId)) {
      banned.push(userId);
      saveBanned(banned);
    }
    msg.reply('تم منعه من دخول الجروب');
    logger.info(`/ban استخدم بواسطة ${msg.author} لمنع ${userId}`);
  }
};
