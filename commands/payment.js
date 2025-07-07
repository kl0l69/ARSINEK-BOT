// أمر /payment
// بيبعت رابط دفع

module.exports = {
  name: 'payment',
  description: 'يبعت رابط دفع',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب المبلغ أو المنتج بعد الأمر');
    // هنا ممكن تربط مع أي خدمة دفع زي Paymob أو Stripe أو حتى لينك فوري
    // هنستخدم لينك دفع افتراضي كمثال
    const amount = args[0];
    const link = `https://pay.example.com/?amount=${amount}`;
    msg.reply(`ادفع من هنا: ${link}`);
    logger.info(`/payment استخدم بواسطة ${msg.author}`);
  }
};
