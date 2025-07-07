// الكود الرئيسي للبوت بـــوت أرسيـــنك - ARSINEK-WA-Bot
// هنا بنشغل البوت ونعمل إعدادات البداية

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const cron = require('node-cron');
const mongoose = require('mongoose');
const settings = require('./config/settings.json');

// إعداد اللوجز
const logger = winston.createLogger({
  level: settings.log_level || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'arsinek-wa-bot.log' }),
    new winston.transports.Console()
  ]
});

// اتصال بقاعدة البيانات
mongoose.connect(settings.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('تم الاتصال بقاعدة البيانات'))
  .catch(err => logger.error('مشكلة في الاتصال بقاعدة البيانات: ' + err));

// إعداد البوت
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', (qr) => {
  // هنا بنعرض QR Code علشان تسجل دخول
  qrcode.generate(qr, { small: true });
  logger.info('امسح الكود ده بـ واتساب علشان تشغل البوت');
});

client.on('ready', () => {
  logger.info('البوت اشتغل وتمام!');
});

// تحميل كل الأوامر تلقائي
const commands = {};
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
  }
});

// استقبال الرسائل

// أدوات التحليل
const { logMessage } = require('./utils/analytics');
const fs = require('fs');
const path = require('path');
// أوامر الفلترة
const blockedPath = path.join(__dirname, 'data/blocked.json');
function loadBlocked() {
  if (!fs.existsSync(blockedPath)) return [];
  return JSON.parse(fs.readFileSync(blockedPath));
}

// تسجيل الحضور اليومي
const attendancePath = path.join(__dirname, 'data/attendance.json');
function loadAttendance() {
  if (!fs.existsSync(attendancePath)) return {};
  return JSON.parse(fs.readFileSync(attendancePath));
}
function saveAttendance(data) {
  fs.writeFileSync(attendancePath, JSON.stringify(data, null, 2));
}

client.on('message', async msg => {
  try {
    // بنسجل كل رسالة في التحليل
    if (msg.isGroupMsg) {
      const chat = await msg.getChat();
      logMessage(chat.id._serialized, msg.author || msg.from, msg.body);
      // تسجيل الحضور اليومي
      const user = msg.author || msg.from;
      const today = new Date().toISOString().slice(0, 10);
      let attendance = loadAttendance();
      if (!attendance[user]) attendance[user] = [];
      if (!attendance[user].includes(today)) {
        attendance[user].push(today);
        saveAttendance(attendance);
      }
    }
    // فلترة الكلمات الممنوعة
    const blocked = loadBlocked();
    if (blocked.some(word => msg.body.includes(word))) {
      await msg.delete(true);
      logger.info(`تم حذف رسالة فيها كلمة ممنوعة بواسطة ${msg.author}`);
      return;
    }
    // حذف الروابط المشبوهة تلقائي
    const suspicious = ['bit.ly', 'adf.ly', 'shorte.st', 'tinyurl.com'];
    if (suspicious.some(link => msg.body.includes(link))) {
      await msg.delete(true);
      logger.info(`تم حذف رسالة مشبوهة بواسطة ${msg.author}`);
      return;
    }
    if (!msg.body.startsWith('/')) return;
    const args = msg.body.slice(1).split(' ');
    const commandName = args.shift().toLowerCase();
    if (commands[commandName]) {
      await commands[commandName].execute(client, msg, args, logger);
    }
  } catch (err) {
    logger.error('مشكلة في تنفيذ الأمر: ' + err);
  }
});

client.initialize();
