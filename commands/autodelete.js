// أمر /autodelete
// بيحذف الروابط المشبوهة تلقائي
const suspicious = ['bit.ly', 'adf.ly', 'shorte.st', 'tinyurl.com'];

module.exports = {
  name: 'autodelete',
  description: 'حذف الروابط المشبوهة',
  async execute(client, msg, args, logger) {
    if (suspicious.some(link => msg.body.includes(link))) {
      await msg.delete(true);
      logger.info(`/autodelete حذف رسالة مشبوهة بواسطة ${msg.author}`);
    }
  }
};
