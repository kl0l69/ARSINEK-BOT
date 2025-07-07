// أمر /pin
// بيعمل تثبيت لإعلان أو رسالة
const fs = require('fs');
const path = require('path');
const pinPath = path.join(__dirname, '../data/pins.json');

function loadPins() {
  if (!fs.existsSync(pinPath)) return [];
  return JSON.parse(fs.readFileSync(pinPath));
}
function savePins(list) {
  fs.writeFileSync(pinPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'pin',
  description: 'تثبيت إعلان',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب الرسالة اللي عايز تثبتها');
    let pins = loadPins();
    pins.push({ text: args.join(' '), time: Date.now() });
    savePins(pins);
    msg.reply('تم تثبيت الرسالة!');
    logger.info(`/pin استخدم بواسطة ${msg.author}`);
  }
};
