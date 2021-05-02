import { Message } from "discord.js";
/**
 * handling di tutti i metodi relativi all'evento `message`
 * @param message: il messaggio su cui eseguire l'handling
 */
export default async function messageHandling(message: Message) {
  const pingPong = async (message: Message) => {
    message.content.toLowerCase().startsWith("ping")
      ?  await message.reply("Pong 🏓!")
      : "";
  };
  await pingPong(message)
}
