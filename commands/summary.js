// أمر /summary
// بيلخص الكلام اللي حصل في الجروب
const { Configuration, OpenAIApi } = require('openai');
const settings = require('../config/settings.json');
const { logMessage } = require('../utils/analytics');

const openai = new OpenAIApi(new Configuration({ apiKey: settings.openai_api_key }));

module.exports = {
  name: 'summary',
  description: 'تلخيص الكلام اللي حصل',
  async execute(client, msg, args, logger) {
    const chat = await msg.getChat();
    let messages = [];
    for (let m of await chat.fetchMessages({ limit: 30 })) {
      messages.push(m.body);
    }
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'لخصلي الكلام ده بالعربي: ' + messages.join('\n') }]
      });
      msg.reply(completion.data.choices[0].message.content);
      logger.info(`/summary استخدم بواسطة ${msg.author}`);
    } catch (err) {
      msg.reply('فيه مشكلة في التلخيص');
      logger.error('مشكلة في /summary: ' + err);
    }
  }
};
