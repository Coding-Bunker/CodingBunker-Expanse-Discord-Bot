import { GuildMember, Message } from "discord.js";
import { _prefix } from "../../env";
import { verifyUserThroughCaptcha } from "./guildMemberAdd";
/**
 * handling di tutti i metodi relativi all'evento `message`
 * @param message: il messaggio su cui eseguire l'handling
 */
export default async function messageHandling(message: Message) {
  const pingPong = async (message: Message) => {
    message.content.toLowerCase().startsWith("ping")
      ? await message.reply("Pong 🏓!")
      : "";
  };
  await pingPong(message);

  await verifyMessageListener(message);
}

async function verifyMessageListener(message: Message) {
  if (
    message.channel.id === process.env.VERIFY_CHANNEL_ID &&
    message.content.toLowerCase().trim() === `${_prefix}verify`
  ) {
    message.delete();

    await verifyUserThroughCaptcha(message.author as unknown as GuildMember)
  }
}
