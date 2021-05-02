import { GuildMember } from "discord.js";
import { sendInitialVerificationMessage } from "../../verification/verificationProcess";
import { error, info, warn } from "../utils/logger";
/**
 * handling di tutti i metodi relativi all'evento `guildMemberAdd`
 * @param member: il membro su cui eseguire l'handling
 */
export default async function guildMemberAdd(member: GuildMember) {
  await sendInitialVerificationMessage(member)
    .then((successMember) => {
      successMember.roles.add("838392861384114216").then((member) => {
        info(
          `[VERIFICA]: al membro ${member.displayName} è stato assegnato il ruolo da verificato`
        );
      });
    })
    .catch(async (failedMember: GuildMember) => {
      setTimeout(async () => {
        warn(
          `[VERIFICA]: Membro ${failedMember.displayName} kickato 🦵!, 1 ora è trascorsa`
        );
        await failedMember
          .kick()
          .catch((err) =>
            error(`[VERIFICA]: Errore nel kicking di ${failedMember.displayName}`, err)
          );
      }, 3600000);
    });
}