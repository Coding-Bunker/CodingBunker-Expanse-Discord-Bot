import Discord, {GuildMember, Message} from "discord.js";
import { customAlphabet } from "nanoid";
const logger = require("../../utils/logger");

const nanoid = customAlphabet("123456789abcdef", 6);

module.exports = async (client: Discord.Client, member: GuildMember) => {
    try {
        member.createDM().then(async (channel) => {
            let verId = nanoid();
            console.log("DM creato")

            await channel.send("Scrivi 'ciao'")
            const filter = (m: Message) => m.content.startsWith("ciao");
            const collector = channel.createMessageCollector(filter, { time: 10000 });
            collector.on("collect", (m) => console.log(typeof m, m.content))
            collector.on("end", collected => console.log(collected.size))
        });
    } catch (e) {
        logger.error("Errore nella verifica di un nuovo membro", e);
    }
}
