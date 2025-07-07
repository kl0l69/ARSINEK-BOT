// أمر /blockword
// بيمنع كلمة من الجروب
const fs = require('fs');
const path = require('path');
const blockPath = path.join(__dirname, '../data/blocked.json');

function loadBlocked() {
  if (!fs.existsSync(blockPath)) return [];
  return JSON.parse(fs.readFileSync(blockPath));
}
function saveBlocked(list) {
  fs.writeFileSync(blockPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'blockword',
  description: 'منع كلمة',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب الكلمة اللي عايز تمنعها');
    let blocked = loadBlocked();
    blocked.push(args[0]);
    saveBlocked(blocked);
    msg.reply('تم منع الكلمة!');
    logger.info(`/blockword استخدم بواسطة ${msg.author}`);
  }
};
