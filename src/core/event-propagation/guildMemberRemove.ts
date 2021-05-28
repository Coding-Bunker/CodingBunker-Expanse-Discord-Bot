import { GuildMember, PartialGuildMember } from "discord.js";
import {
  createNewEmbedBasedOnCase,
  sendMessageToInfoChannel,
} from "../../helpers/helpers";

export default async function guildMemberRemove(
  member: GuildMember | PartialGuildMember
) {
  const embedMessage = createNewEmbedBasedOnCase({
    member: member as GuildMember,
    color: "#e53935",
    title: `Il membro ${member.displayName} è uscito dal server`,
  });
  await sendMessageToInfoChannel(member as GuildMember, embedMessage);
}
