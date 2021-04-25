const dotEnv = require('dotenv');
const { Telegraf } = require('telegraf');

dotEnv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

/**
 * Send the message to telegram based on the chat id
 */
const sendMessageToTelegram = async message => {
  console.log(`CHAT_ID`, process.env.TELEGRAM_CHAT_ID);
  console.log(`message`, message);

  await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};

/**
 * The Lambda function
 *
 * @return {Promise<void>}
 */
module.exports.handler = async () => {
  await bot.launch();

  await console.log(`Bot started at:`, Date.now());

  await sendMessageToTelegram(
    'This is an interval test message for AWS integration'
  ).then(() => console.info('Message sent!'));

  await bot.stop('Terminating the bot');
};
