// أمر /task
// بيضيف مهمة جديدة
const fs = require('fs');
const path = require('path');
const tasksPath = path.join(__dirname, '../data/tasks.json');

function loadTasks() {
  if (!fs.existsSync(tasksPath)) return [];
  return JSON.parse(fs.readFileSync(tasksPath));
}
function saveTasks(list) {
  fs.writeFileSync(tasksPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'task',
  description: 'إضافة مهمة',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب المهمة بعد الأمر');
    const task = { user: msg.author, text: args.join(' '), done: false };
    let tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    msg.reply('تم إضافة المهمة!');
    logger.info(`/task استخدم بواسطة ${msg.author}`);
  }
};
