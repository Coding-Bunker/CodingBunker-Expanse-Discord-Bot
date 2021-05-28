import { GuildMember, MessageEmbed, TextChannel } from "discord.js";

type InfoChannelMessage = MessageEmbed | string;

export const sendMessageToInfoChannel = async (
  member: GuildMember,
  message: InfoChannelMessage
) => {
  const infoChannel = member.guild.channels.cache.find(
    (channel) => channel.id === process.env.INFO_CHANNEL_ID
  ) as TextChannel;
  await infoChannel.send(message);
};

interface InfoEmbedGenericProps {
  member?: GuildMember;
  color?: string;
  title?: string;
}

export const createNewEmbedBasedOnCase = ({
  member,
  color,
  title
}: InfoEmbedGenericProps) => {
  const embedMessage = new MessageEmbed()
    .setColor(color)
    .setAuthor("Verifica")
    .setTitle(title)
    .addField(`[id]`, member.id)
    .addField(`[discriminatore]`, member.user.discriminator);
  return embedMessage;
};

export const createNewDMEmbedBasedOnCase = ({
  color,
  title
}: InfoEmbedGenericProps) => {
  const embedMessage = new MessageEmbed()
    .setColor(color)
    .setAuthor("Verifica")
    .setTitle(title)
  return embedMessage;
};
