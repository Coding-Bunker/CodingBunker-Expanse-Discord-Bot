import path from "path";
import RequireAll from "require-all-ts";
import Discord from "discord.js";
const logger = require("../utils/logger");

// Questo file serve per gestire gli eventi del bot

let discordClient: Discord.Client

module.exports = {
    init(client: Discord.Client) {
        discordClient = client;
        this.initEssentialEvents()
        this.initEvents()
    },

    initEssentialEvents(client = discordClient) {
        client.once("ready", async () => {
            // Aggiorno lo status del bot ogni ora
            // perchè capita spesso che il bot perda il suo stato dopo un tot di ore
            const updateStatus = async () => {
                await client.user.setActivity("il server", { type: "WATCHING" });
            }

            await updateStatus();
            // setto un interval sul client cosí se il client viene stoppato anche l'interval viene cancellato
            client.setInterval(updateStatus, 3600000);

            logger.info("💫 Bot Pronto all'arrembaggio!");
        });

        client.on("error", e => {
            logger.error("Il client ha riscontrato un errore generico", e);
        });

        client.on("warn", w => {
            logger.error("Il client ha ricevuto un warning generico", w);
        });
    },

    initEvents(client = discordClient) {
        // Prendo tutti i file degli eventi all'interno della cartella events
        // Con l'aiuto del modulo require-all
        const events = Object.entries(
            RequireAll({
                dirname: path.join(__dirname, 'events'),
                filter: /^(?!-)(.+)\.[tj]s$/,
            })
        );

        /*
          Bindo gli eventi al bot
            e[0] è il nome dell'evento (che viene preso direttamente dal nome del file)
            e[1] è la funzione che verrà eseguita quindi il bot riceve quell'evento, ed è il module.export del file
         */
        events.forEach((e) => client.on(e[0], e[1].bind(null, client)));

        // Quindi per gestire gli eventi basta aggiungere il file con il nome preciso dell'evento e mettere all'interno un module.export con la funzione che il bot deve eseguire per quell'evento
    }
}
