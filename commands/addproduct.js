// أمر /addproduct
// بيضيف منتج بالجروب (اسم وسعر وصورة)
const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../data/products.json');

function loadProducts() {
  if (!fs.existsSync(productsPath)) return [];
  return JSON.parse(fs.readFileSync(productsPath));
}
function saveProducts(list) {
  fs.writeFileSync(productsPath, JSON.stringify(list, null, 2));
}

module.exports = {
  name: 'addproduct',
  description: 'يضيف منتج بالجروب',
  async execute(client, msg, args, logger) {
    if (args.length < 2) return msg.reply('اكتب اسم المنتج والسعر');
    const name = args[0];
    const price = args[1];
    let image = null;
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      image = media.data;
    }
    let products = loadProducts();
    products.push({ name, price, image });
    saveProducts(products);
    msg.reply('تم إضافة المنتج!');
    logger.info(`/addproduct استخدم بواسطة ${msg.author}`);
  }
};
