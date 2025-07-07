// أمر /projectidea
// اقتراح مشاريع تخرج
const { Configuration, OpenAIApi } = require('openai');
const settings = require('../config/settings.json');
const openai = new OpenAIApi(new Configuration({ apiKey: settings.openai_api_key }));

module.exports = {
  name: 'projectidea',
  description: 'اقتراح مشاريع تخرج',
  async execute(client, msg, args, logger) {
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'اقترحلي فكرة مشروع تخرج جديدة ومميزة' }]
      });
      msg.reply(completion.data.choices[0].message.content);
      logger.info(`/projectidea استخدم بواسطة ${msg.author}`);
    } catch (err) {
      msg.reply('فيه مشكلة في الاقتراح');
      logger.error('مشكلة في /projectidea: ' + err);
    }
  }
};
