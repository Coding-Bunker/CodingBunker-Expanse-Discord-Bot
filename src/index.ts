import Discord from "discord.js";
const logger = require("./core/utils/logger");
const eventsHandler = require("./core/events-handler/eventsHandler");

const client = new Discord.Client({
    // Non ci serve cachare molti message al momento
    // e non ci serve neanche tenere nella cache neanche i messaggi che sono stati editati
    // Riduce la quantità di memoria utilizzata dal bot
    messageCacheMaxSize: 30,
    messageEditHistoryMaxSize: 0,
});

eventsHandler.init(client);

client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => logger.info("Bot loggato su Discord"))
    // TODO: Type eccezione
    .catch(e => {
        logger.error("Bot non loggato su Discord, token invalido", e);
        process.exit();
    });
