// أمر /shortcut
// بيرد بالرابط المحفوظ
const fs = require('fs');
const path = require('path');
const shortcutPath = path.join(__dirname, '../data/shortcuts.json');

function loadShortcuts() {
  if (!fs.existsSync(shortcutPath)) return {};
  return JSON.parse(fs.readFileSync(shortcutPath));
}
function saveShortcuts(obj) {
  fs.writeFileSync(shortcutPath, JSON.stringify(obj, null, 2));
}

module.exports = {
  name: 'shortcut',
  description: 'رابط محفوظ',
  async execute(client, msg, args, logger) {
    if (args.length < 1) return msg.reply('اكتب اسم الشورت كت أو "اسم" "رابط"');
    let shortcuts = loadShortcuts();
    if (args.length === 2) {
      // إضافة شورت كت
      shortcuts[args[0]] = args[1];
      saveShortcuts(shortcuts);
      msg.reply('تم حفظ الشورت كت!');
    } else {
      // جلب شورت كت
      const link = shortcuts[args[0]];
      if (link) msg.reply(link);
      else msg.reply('الشورت كت مش موجود');
    }
    logger.info(`/shortcut استخدم بواسطة ${msg.author}`);
  }
};
