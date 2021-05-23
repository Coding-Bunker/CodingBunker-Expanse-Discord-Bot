import { nanoid } from "nanoid";
import { GuildMember, Message, MessageAttachment } from "discord.js";
import { info, warn, error as loggerError } from "../core/utils/logger";
import {
  createNewCaptcha,
  sendDmDisabledError,
  sendVerificationGreetingMessage,
} from "./verificationProcessMethods";
import { createCanvas } from "canvas";

export const sendInitialVerificationMessage = async (
  newMember: GuildMember
): Promise<GuildMember> => {
  return new Promise<GuildMember>(async (res, rej) => {
    try {
      newMember.createDM().then(async (channel) => {
        let verId = nanoid(10);
        info(
          `[VERIFICA]: 🟩 Nuovo canale DM creato per la verifica, id: ${verId}, membro da verificare: ${newMember.displayName}`
        );

        const captchaImage = createNewCaptcha(verId);
        const attachment = new MessageAttachment(
          captchaImage.createPNGStream(),
          "captcha.png"
        );
        const greetEmbed = sendVerificationGreetingMessage();
        channel.send(greetEmbed);
        channel.send(attachment).catch((error) => {
          sendDmDisabledError(newMember);
          warn(error);
        });
        const filter = (m: Message) => m.content.trim() === verId;
        const collector = channel.createMessageCollector(filter, {
          time: 100000,
          max: 4,
          maxProcessed: 4,
        });

        collector.on("collect", async (m: Message) => {
          if (m.content.trim() === verId) {
            await channel.send(`Verificato con successo.`).catch(() => {
              sendDmDisabledError(newMember);
            });
            info(
              `[VERIFICA]: 💚 Verifica per ${newMember.displayName} eseguita con successo`
            );
            await channel.delete();
            res(newMember);
          }
        });

        collector.on("end", (collected) => {
          if (collected.size === 0) {
            channel.send(`Verifica fallita`).catch(() => {});
            warn(
              `[VERIFICA]: ❌ Verifica per ${newMember.displayName} fallita`
            );
            channel.delete();
            rej(newMember);
          }
        });
      });
    } catch (error) {
      loggerError(
        `[VERIFICA]: Errore nella creazione del channel`,
        JSON.stringify(error)
      );
    }
  });
};
