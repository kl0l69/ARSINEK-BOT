// أمر /remind
// بيبعت تذكير بعد وقت معين
const { addReminder } = require('../utils/scheduler');

module.exports = {
  name: 'remind',
  description: 'تذكير بعد وقت معين',
  async execute(client, msg, args, logger) {
    if (args.length < 2) return msg.reply('اكتب الوقت والرسالة: /remind 10m اشرب ميه');
    const timeArg = args.shift();
    const message = args.join(' ');
    // تحويل الوقت لصيغة كرون
    let minutes = 0;
    if (timeArg.endsWith('m')) minutes = parseInt(timeArg);
    else if (timeArg.endsWith('h')) minutes = parseInt(timeArg) * 60;
    else return msg.reply('اكتب الوقت زي 10m أو 1h');
    const cronTime = `*/${minutes} * * * *`;
    addReminder(cronTime, () => {
      msg.reply('⏰ تذكير: ' + message);
      logger.info(`/remind تم إرسال تذكير: ${message}`);
    });
    msg.reply('تمام! هفكرك بعد ' + timeArg);
  }
};
