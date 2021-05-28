import { GuildMember, MessageEmbed } from "discord.js";
import { Canvas, createCanvas } from "canvas";
import {
  createNewEmbedBasedOnCase,
  sendMessageToInfoChannel,
} from "../helpers/helpers";

export const sendDmDisabledError = (member: GuildMember) => {
  const embedMessage = createNewEmbedBasedOnCase({
    member,
    color: "#e53935",
    title: `Impossibile verificare l'utente ${member.displayName}, DM Disabilitati`,
  });
  sendMessageToInfoChannel(member, embedMessage);
};

export const sendVerificationSuccessMessage = (member: GuildMember) => {
  const embedMessage = createNewEmbedBasedOnCase({
    member,
    color: "#43A047",
    title: `Verifica per il membro ${member.displayName} eseguita con successo!`
  })
  sendMessageToInfoChannel(member, embedMessage);
};

export const sendUserKickedAfterFailedVerification = (member: GuildMember) => {
  const embedMessage = createNewEmbedBasedOnCase({
    member,
    color: "#FB8C00",
    title: `Il membro ${member.displayName} è stato kickato, dato che è passata 1 ora e non ha completato la verifica`
  })
  sendMessageToInfoChannel(member, embedMessage);
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

  // Sfondo
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 200, 200);

  // Testo
  ctx.font = "20px Monospace";
  ctx.fillStyle = "#000";
  ctx.fillText(id, 50, 100);

  // Disturbo
  var text = ctx.measureText(id);
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + text.width, 102);
  ctx.stroke();

  return canvas;
};
