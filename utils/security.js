// أدوات الأمان والصلاحيات
// هنا بنحدد مين الأدمن ونتأكد من الصلاحيات

const settings = require('../config/settings.json');

function isAdmin(userId) {
  // بنشوف لو اليوزر ده أدمن
  return settings.admins.includes(userId);
}

function addAdmin(userId) {
  if (!settings.admins.includes(userId)) {
    settings.admins.push(userId);
    // ممكن تحفظ التغيير في settings.json لو حبيت
  }
}

module.exports = { isAdmin, addAdmin };
