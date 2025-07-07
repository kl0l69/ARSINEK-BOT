// أدوات التحليل والمتابعة
// هنا بنحسب التفاعل والكلمات الشائعة وغيره

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/analytics.json');

function loadAnalytics() {
  if (!fs.existsSync(DATA_PATH)) return {};
  return JSON.parse(fs.readFileSync(DATA_PATH));
}

function saveAnalytics(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function logMessage(groupId, userId, message) {
  // بنسجل كل رسالة علشان نحللها بعدين
  const data = loadAnalytics();
  if (!data[groupId]) data[groupId] = { users: {}, messages: [] };
  if (!data[groupId].users[userId]) data[groupId].users[userId] = 0;
  data[groupId].users[userId]++;
  data[groupId].messages.push(message);
  saveAnalytics(data);
}

function getGhosts(groupId) {
  // بنجيب الناس اللي مش بتشارك
  const data = loadAnalytics();
  if (!data[groupId]) return [];
  return Object.entries(data[groupId].users).filter(([_, count]) => count < 3).map(([user]) => user);
}

function getHotWords(groupId) {
  // أكتر كلمات اتكررت
  const data = loadAnalytics();
  if (!data[groupId]) return [];
  const words = {};
  data[groupId].messages.forEach(msg => {
    msg.split(' ').forEach(word => {
      if (!words[word]) words[word] = 0;
      words[word]++;
    });
  });
  return Object.entries(words).sort((a, b) => b[1] - a[1]).slice(0, 10);
}

module.exports = { logMessage, getGhosts, getHotWords };
