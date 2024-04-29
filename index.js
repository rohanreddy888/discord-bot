const { Client, GatewayIntentBits } = require("discord.js");
const { connectToMongoDB } = require("./connect");
const { handleGenerateShortURL } = require("./controllers/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Not Connected", err));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    const generatedURL = await handleGenerateShortURL(url);
    return message.reply({
      content: generatedURL.toString(),
    });
  }
  message.reply("Hi from Bot");
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});

client.login(
  "MTIzNDIxNTk5ODA0NzkxMTk2Ng.GvfyPZ.D-StkFiD8KmICy3piWx9c3WDXtfW5L3wFsUNyI"
);
