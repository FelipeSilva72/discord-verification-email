import { Guild } from "discord.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailCode(email: string, code: string, guild: Guild) {
  return await resend.emails.send({
    from: `${guild.name} <${guild.name}@resend.dev>`,
    to: [email],
    subject: `Olá, seu código de verificação é ${code}`,
    html: `<h1>${code}</h1>`,
  });
}
