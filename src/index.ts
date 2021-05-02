import Discord from "discord.js";
import { info, error } from "./core/utils/logger";
import dotenv from "dotenv";
dotenv.config();

import guildMemberAdd from "./core/event-propagation/guildMemberAdd";
import messageHandling from "./core/event-propagation/message";

const client = new Discord.Client({
  // Non ci serve cachare molti message al momento
  // e non ci serve neanche tenere nella cache neanche i messaggi che sono stati editati
  // Riduce la quantità di memoria utilizzata dal bot
  messageCacheMaxSize: 30,
  messageEditHistoryMaxSize: 0,
});

client.on("guildMemberAdd", async (member) => {
  await guildMemberAdd(member);
});

client.on("message", async (message) => {
  await messageHandling(message);
});

client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => info("Bot loggato su Discord"))
  .catch((e) => {
    error("Bot non loggato su Discord, token invalido", e);
    process.exit();
  });
