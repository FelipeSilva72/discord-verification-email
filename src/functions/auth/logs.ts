import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";
import { codeBlock, GuildMember, TextChannel } from "discord.js";

interface AuthData {
  member: GuildMember;
  code: string;
  channelLogs: TextChannel;
}

export async function verificationSendLog(data: AuthData) {
  const { member, code, channelLogs } = data;

  const embed = createEmbed({
    description: "## Nova Verificação",
    fields: [
      {
        name: "Membro",
        value: codeBlock(`${member.user.username} (${member.id})`),
      },
      { name: "Código", value: codeBlock(code) },
      { name: "Horário", value: codeBlock(formatDate(new Date())) },
    ],
    color: settings.colors.primary,
    thumbnail: member.displayAvatarURL(),
  });

  return await channelLogs.send({ embeds: [embed] });
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(date);
}
