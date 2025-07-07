// أمر رسائل مجدولة
// بيبعت رسائل تلقائية في أوقات معينة
const { addReminder } = require('../utils/scheduler');

module.exports = {
  name: 'scheduled',
  description: 'رسائل مجدولة تلقائية',
  async execute(client, msg, args, logger) {
    // مثال: كل جمعة دعاء
    addReminder('0 9 * * 5', () => {
      msg.reply('جمعة مباركة! 🤲');
    });
    // كل يوم رسالة صباحية
    addReminder('0 7 * * *', () => {
      msg.reply('صباح الفل على الناس الحلوة!');
    });
    // كل سبت جدول الأسبوع
    addReminder('0 8 * * 6', () => {
      msg.reply('جدول الأسبوع: ...');
    });
    msg.reply('تم تفعيل الرسائل المجدولة!');
    logger.info(`/scheduled استخدم بواسطة ${msg.author}`);
  }
};
