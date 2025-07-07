// أمر /ocr
// بيحول صورة لنص
const Tesseract = require('tesseract.js');

module.exports = {
  name: 'ocr',
  description: 'تحويل صورة لنص',
  async execute(client, msg, args, logger) {
    if (!msg.hasMedia) return msg.reply('ابعت صورة علشان أقرأ النص');
    const media = await msg.downloadMedia();
    Tesseract.recognize(Buffer.from(media.data, 'base64'), 'ara+eng')
      .then(({ data: { text } }) => {
        msg.reply('النص اللي في الصورة:\n' + text);
        logger.info(`/ocr استخدم بواسطة ${msg.author}`);
      })
      .catch(err => {
        msg.reply('فيه مشكلة في قراءة الصورة');
        logger.error('مشكلة في /ocr: ' + err);
      });
  }
};
