const dotEnv = require('dotenv');
const { Telegraf } = require('telegraf');

dotEnv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

/**
 * Send the message to telegram based on the chat id
 *
 * @param message
 */
const sendMessageToTelegram = message =>
  bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);

/**
 * The Lambda function handler that launches and stops the bot on each call from CloudWatch events
 */
module.exports.handler = async () => {
  // Create a new instance of the bot
  bot.launch().then(() => console.info('Bot started at:', Date.now()));

  await sendMessageToTelegram(
    'This is an interval test message for AWS integration'
  )
    .then(() => console.info('Message sent!'))
    .catch(err => console.error(err));

  // We need to shut the bot and terminate the Lambda function
  return bot.stop('Terminating the bot');
};
