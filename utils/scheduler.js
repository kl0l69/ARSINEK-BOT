// ملف الجدولة والتذكير
// هنا بنستخدم node-cron علشان ننفذ أوامر في وقت معين

const cron = require('node-cron');
const reminders = [];

// إضافة تذكير جديد
function addReminder(time, callback) {
  // بنضيف التذكير في الليستة ونشغله
  const task = cron.schedule(time, callback, { scheduled: true });
  reminders.push(task);
  return task;
}

// إلغاء كل التذكيرات
function clearReminders() {
  reminders.forEach(task => task.stop());
  reminders.length = 0;
}

module.exports = { addReminder, clearReminders };
