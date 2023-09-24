const { Telegraf, Markup } = require('telegraf');
// const { message } = require('telegraf/filters');
require('dotenv').config()
const text = require('./const')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнайомець'}😁! Якщо ти потрапив сюди, значить ти готовий мінятися на краще 🥇. Цей бот буде тобі вірним супутником у тренуваннях, отож починаємо👊 | Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : 'stranger'}😁! If you got here, then you are ready to change for the better 🥇. This bot will be your faithful companion in training, so let's get started👊`));

bot.help((ctx) => ctx.reply(text.commands));

bot.command('training', async (ctx) => {
   try {
      await ctx.replyWithHTML('<b>Привіт ще раз🖐️, тут зібрані тренування для твого тіла🏋️‍♂️🔥 | Hello again🖐️, here are the exercises for your body🏋️‍♂️🔥</b>', Markup.inlineKeyboard(
         [
            [Markup.button.callback('Грудні мязи 1️⃣ | Pectoral muscles 1️⃣', 'category1_btn1')],
            [Markup.button.callback('Ікроножні і квадрицепс 2️⃣ | calf and quadriceps 2️⃣', 'category1_btn2')],
            [Markup.button.callback('Робота над товщиною спини 3️⃣ | Work on the thickness of the back 3️⃣', 'category1_btn3')],
            [Markup.button.callback('Дельти 4️⃣ | Deltas 4️⃣', 'category1_btn4')],
            [Markup.button.callback('Біцепс бедра і  ширина спини 5️⃣ | Biceps of the thighs and width of the back 5️⃣', 'category1_btn5')],
            [Markup.button.callback('Біцепс і трицепс 6️⃣ | Biceps and triceps 6️⃣', 'category1_btn6')],
         ]
      ))
   } catch (e) {
      console.log(e);
   }
});

bot.command('food', async (ctx) => {
   try {
      await ctx.replyWithHTML('<b>Також не забуваємо про харчування🥩🍏, адже від нього залежить 70% твого результату🏆 | We also do not forget about nutrition🥩🍏, because 70% of your result depends on it🏆</b>', Markup.inlineKeyboard(
         [
            [Markup.button.callback('Найкращі продукти для набору маси🍗🥪 | The best products for weight gain🍗🥪', 'btnfood_1')],
            [Markup.button.callback('Найкращі продукти для схуднення🥑🥕 | The best products for weight loss🥑🥕', 'btnfood_2')]
         ]
      ))
   } catch (e) {
      console.log(e);
   }
});

bot.command('music', async (ctx) => {
   try {
      await ctx.replyWithHTML('<b>Тут я зберігаю накрутішу музику🎶 для твого вибухового тренування, крути до повного 🔊🎧! | Here I keep the hottest music🎶 for your explosive workout, crank it up 🔊🎧!</b>', Markup.inlineKeyboard(
         [
            [Markup.button.callback('Bass music🔈', 'btnmusic_1'),
            Markup.button.callback('Rep🔉', 'btnmusic_2'),
            Markup.button.callback('Motivation🔊', 'btnmusic_3')]
         ]
      ))
   } catch (e) {
      console.log(e);
   }
});

function addActionBot(name, src, text) {
   bot.action(name, async (ctx) => {
      try {
         await ctx.answerCbQuery()
         if (src !== false) {
            await ctx.replyWithPhoto({
               source: src
            })
         }
         await ctx.replyWithHTML(text, {
            disable_web_page_preview: false
         })
      } catch (e) {
         console.log(e);
      }
   })
};


addActionBot('category1_btn1', './img/grud.jpg', text);
addActionBot('category1_btn2', './img/kvadritseps.jpg', text);
addActionBot('category1_btn3', './img/back.jpg', text);
addActionBot('category1_btn4', './img/deltas.jpg', text);
addActionBot('category1_btn5', './img/leg.jpg', text);
addActionBot('category1_btn6', './img/hands.jpg', text);



bot.launch();
console.log("Бот запущен");
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));