import { GuildMember, TextChannel, MessageEmbed } from "discord.js";
import { Canvas, createCanvas } from "canvas";

export const sendDmDisabledError = (member: GuildMember) => {
  const infoChannel = member.guild.channels.cache.find(
    (channel) => channel.id === process.env.INFO_CHANNEL_ID
  ) as TextChannel;
  const embedMessage = new MessageEmbed()
    .setColor("#e53935")
    .setAuthor("Verifica")
    .setTitle(
      `Impossibile verificare l'utente ${member.displayName}, DM Disabilitati`
    )
    .addField(`[id]`, member.id)
    .addField(`[discriminatore]`, member.user.discriminator);
  infoChannel.send(embedMessage);
};

export const sendVerificationSuccessMessage = (member: GuildMember) => {
  const infoChannel = member.guild.channels.cache.find(
    (channel) => channel.id === process.env.INFO_CHANNEL_ID
  ) as TextChannel;
  const embedMessage = new MessageEmbed()
    .setColor("#43A047")
    .setAuthor("Verifica")
    .setTitle(
      `Verifica per il membro ${member.displayName} eseguita con successo!`
    )
    .addField(`[id]`, member.id);
  infoChannel.send(embedMessage);
};

export const sendUserKickedAfterFailedVerification = (member: GuildMember) => {
  const embedMessage = new MessageEmbed()
    .setColor("#FB8C00")
    .setAuthor("Verifica")
    .setTitle(
      `Il membro ${member.displayName} è stato kickato, dato che è passata 1 ora e non ha completato la verifica`
    )
    .addField(`[id]`, member.id)
    .addField(`[discriminatore]`, member.user.discriminator);
  const infoChannel = member.guild.channels.cache.find(
    (channel) => channel.id === process.env.INFO_CHANNEL_ID
  ) as TextChannel;
  infoChannel.send(embedMessage);
};

export const sendVerificationGreetingMessage = (): MessageEmbed => {
  const e = new MessageEmbed()
    .setAuthor("Verifica")
    .setTitle(
      "Ciao 👋! Questo è il processo di verifica per entrare nel server!"
    )
    .setDescription("Mandami un messaggio col captcha scritto qui sotto!");
  return e;
};

export const createNewCaptcha = (id: string): Canvas => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 200, 200);

  ctx.font = "20px Monospace";
  ctx.fillStyle = "#000";
  ctx.fillText(id, 50, 100);

  return canvas;
};
