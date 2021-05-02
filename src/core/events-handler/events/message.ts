import Discord, {Message} from "discord.js";
const logger = require("../../utils/logger");

module.exports = async (client: Discord.Client, message: Message) => {
    try {
        // Ignoro gli altri bot (credo sia nel regolamento di Discord anche)
        if (message.author.bot)
            return

        if (message.content.toLowerCase() === "ping")
            await message.reply("pong 🏓");
    } catch (e) {
        logger.error("Errore nella gestione di ricezione di un messaggio", e);
    }
}
