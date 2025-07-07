// أمر /done
// بيخلص مهمة
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
  name: 'done',
  description: 'إنهاء مهمة',
  async execute(client, msg, args, logger) {
    let tasks = loadTasks();
    const user = msg.author;
    let found = false;
    tasks = tasks.map(t => {
      if (t.user === user && !t.done) {
        t.done = true;
        found = true;
      }
      return t;
    });
    saveTasks(tasks);
    msg.reply(found ? 'تم إنهاء المهمة!' : 'مفيش مهام مفتوحة ليك');
    logger.info(`/done استخدم بواسطة ${user}`);
  }
};
