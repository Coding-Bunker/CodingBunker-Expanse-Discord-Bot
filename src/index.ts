import Discord from "discord.js";
import { info, error } from "./core/utils/logger";
import dotenv from "dotenv";
dotenv.config();

import guildMemberAdd from "./core/event-propagation/guildMemberAdd";
import messageHandling from "./core/event-propagation/message";
import guildMemberRemove from "./core/event-propagation/guildMemberRemove";

export const client = new Discord.Client({
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

client.on("guildMemberRemove", async (member) => {
  await guildMemberRemove(member);
})

client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => info("🚀 𝐵𝑜𝓉 𝐿𝑜𝑔𝑔𝒶𝓉𝑜 𝓈𝓊 𝒟𝒾𝓈𝒸𝑜𝓇𝒹 𝒸𝑜𝓃 𝓈𝓊𝒸𝒸𝑒𝓈𝓈𝑜!"))
  .catch((e) => {
    error("❌ 𝐼𝓂𝓅𝑜𝓈𝓈𝒾𝒷𝒾𝓁𝑒 𝐿𝑜𝑔𝑔𝒶𝓇𝑒 𝓈𝓊 𝒟𝒾𝓈𝒸𝑜𝓇𝒹", e);
    process.exit();
  });
