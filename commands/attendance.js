// أمر كشف الغياب
// بيسجل المتفاعلين يومياً ويطلع تقرير
const fs = require('fs');
const path = require('path');
const { logMessage } = require('../utils/analytics');
const { jsPDF } = require('jspdf');
const attendancePath = path.join(__dirname, '../data/attendance.json');

function loadAttendance() {
  if (!fs.existsSync(attendancePath)) return {};
  return JSON.parse(fs.readFileSync(attendancePath));
}
function saveAttendance(data) {
  fs.writeFileSync(attendancePath, JSON.stringify(data, null, 2));
}

module.exports = {
  name: 'attendance',
  description: 'كشف الغياب اليومي',
  async execute(client, msg, args, logger) {
    // هنا بنطلع كشف الغياب
    const data = loadAttendance();
    let text = 'كشف الغياب:\n';
    Object.entries(data).forEach(([user, days]) => {
      text += `@${user.split('@')[0]}: ${days.length} يوم\n`;
    });
    msg.reply(text);
    logger.info(`/attendance استخدم بواسطة ${msg.author}`);
  }
};
