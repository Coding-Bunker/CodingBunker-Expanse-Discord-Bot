import { customAlphabet } from "nanoid";
import { GuildMember, Message } from "discord.js";

const nanoid = customAlphabet("123456789abcdef", 6);

export const sendInitialVerificationMessage = async (
  newMember: GuildMember
) => {
  try {
    newMember.createDM().then(async (channel) => {
      let verId = nanoid();
      console.log("DM creato")

      channel.send("Scrivi 'ciao'")
      const filter = (m: Message) => m.content.startsWith("ciao");
      const collector = channel.createMessageCollector(filter, { time: 10000 });
      collector.on("collect", (m) => console.log(typeof m, m.content))
      collector.on("end", collected => console.log(collected.size))
    });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
