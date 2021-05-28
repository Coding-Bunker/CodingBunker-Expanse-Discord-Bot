import { nanoid } from "nanoid";
import { GuildMember, Message, MessageAttachment } from "discord.js";
import { warn, error as loggerError } from "../core/utils/logger";
import {
  createNewCaptcha,
  sendDmDisabledError,
  sendVerificationGreetingMessage,
} from "./verificationProcessMethods";
import { createNewDMEmbedBasedOnCase } from "../helpers/helpers";

export const sendInitialVerificationMessage = async (
  newMember: GuildMember
): Promise<GuildMember> => {
  return new Promise<GuildMember>(async (res, rej) => {
    try {
      newMember.createDM().then(async (channel) => {
        let verId = nanoid(10);
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
            const successEmbed = createNewDMEmbedBasedOnCase({
              color: "#43A047",
              title: "Verifica eseguita con successo! Benvenut*!"
            })
            await channel.send(successEmbed).catch(() => {
              sendDmDisabledError(newMember);
            });
            await channel.delete();
            res(newMember);
          }
        });

        collector.on("end", (collected) => {
          if (collected.size === 0) {
            /**
             * TODO: Creare un comando per lanciare da capo una verifica
             */
            const failedEmbed = createNewDMEmbedBasedOnCase({
              color: "#e53935",
              title: `Verifica Fallita!`
            })
            channel.send(failedEmbed).catch((err) => {
              loggerError("Errore nella verifica", err.message)
            });
            channel.delete();
            rej(newMember);
          }
        });
      });
    } catch (error) {
      loggerError(
        `[VERIFICA]: Errore nella creazione del channel`,
        error.message
      );
    }
  });
};
