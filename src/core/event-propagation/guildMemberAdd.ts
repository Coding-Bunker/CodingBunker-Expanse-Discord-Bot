import { GuildMember } from "discord.js";
import { sendInitialVerificationMessage } from "../../verification/verificationProcess";
import {
  sendUserKickedAfterFailedVerification,
  sendVerificationSuccessMessage,
} from "../../verification/verificationProcessMethods";
import { error, info } from "../utils/logger";

export async function verifyUserThroughCaptcha (member: GuildMember){
  await sendInitialVerificationMessage(member)
    .then((successMember) => {
      successMember.roles.add(process.env.JUNIOR_ROLE_ID).then((member) => {
        info(
          `[VERIFICA]: al membro ${member.displayName} è stato assegnato il ruolo da verificato`
        );
      });
      sendVerificationSuccessMessage(member);
    })
    .catch(async (failedMember: GuildMember) => {
      info(
        `[VERIFICA]: Timer di Kick avviato per l'utente: ${failedMember.displayName}`
      );
      setTimeout(async () => {
        sendUserKickedAfterFailedVerification(member);
        await failedMember
          .kick()
          .catch((err) =>
            error(
              `[VERIFICA]: Errore nel kicking di ${failedMember.displayName}`,
              err
            )
          );
      }, 3600000);
    });
}

/**
 * handling di tutti i metodi relativi all'evento `guildMemberAdd`
 * @param member: il membro su cui eseguire l'handling
 */
 export default async function guildMemberAdd(member: GuildMember) {
  await verifyUserThroughCaptcha(member);
}
