// أمر /ai
// بيرد من OpenAI GPT
const { Configuration, OpenAIApi } = require('openai');
const settings = require('../config/settings.json');

const openai = new OpenAIApi(new Configuration({ apiKey: settings.openai_api_key }));

module.exports = {
  name: 'ai',
  description: 'ذكاء اصطناعي يشرح أو يجاوب',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب سؤالك بعد الأمر');
    const prompt = args.join(' ');
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      });
      msg.reply(completion.data.choices[0].message.content);
      logger.info(`/ai استخدم بواسطة ${msg.author}`);
    } catch (err) {
      msg.reply('فيه مشكلة في الذكاء الاصطناعي');
      logger.error('مشكلة في /ai: ' + err);
    }
  }
};
