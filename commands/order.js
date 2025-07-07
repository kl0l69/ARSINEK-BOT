// أمر /order
// بيبدأ عملية شراء
const fs = require('fs');
const path = require('path');
const ordersPath = path.join(__dirname, '../data/orders.json');

function loadOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  return JSON.parse(fs.readFileSync(ordersPath));
}
function saveOrders(list) {
  fs.writeFileSync(ordersPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'order',
  description: 'يبدأ عملية شراء',
  async execute(client, msg, args, logger) {
    if (args.length < 1) return msg.reply('اكتب اسم المنتج اللي عايز تشتريه');
    const productName = args.join(' ');
    let orders = loadOrders();
    orders.push({ user: msg.author, product: productName, time: Date.now() });
    saveOrders(orders);
    msg.reply('تم تسجيل طلبك! هنتواصل معاك قريب');
    logger.info(`/order استخدم بواسطة ${msg.author}`);
  }
};
