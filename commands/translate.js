// أمر /translate
// بيترجم النصوص
const { Configuration, OpenAIApi } = require('openai');
const settings = require('../config/settings.json');
const openai = new OpenAIApi(new Configuration({ apiKey: settings.openai_api_key }));

module.exports = {
  name: 'translate',
  description: 'ترجمة النصوص',
  async execute(client, msg, args, logger) {
    if (args.length === 0) return msg.reply('اكتب النص اللي عايز تترجمه');
    const text = args.join(' ');
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `ترجم النص ده للعربي: ${text}` }]
      });
      msg.reply(completion.data.choices[0].message.content);
      logger.info(`/translate استخدم بواسطة ${msg.author}`);
    } catch (err) {
      msg.reply('فيه مشكلة في الترجمة');
      logger.error('مشكلة في /translate: ' + err);
    }
  }
};
