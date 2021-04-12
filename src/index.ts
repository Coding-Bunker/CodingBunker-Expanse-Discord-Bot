import Discord from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("💫 Bot Pronto all'arrembaggio");
});

client.on("message", (message) => {
  if (message.content.toLowerCase() === "ping") message.reply("Pong!");
});

client.login(process.env.DISCORD_BOT_TOKEN);
