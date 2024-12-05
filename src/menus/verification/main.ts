import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import {
  ButtonBuilder,
  ButtonStyle,
  InteractionReplyOptions,
} from "discord.js";

export function verificationMainMenu() {
  const embed = createEmbed({
    description: brBuilder(
      "## Sistema de Verificação",
      "- Olá seja bem-vindo(a) ao sistema de verificação",
      "- Para iniciar sua verificação clique no botão abaixo"
    ),
    color: settings.colors.primary,
  });

  const row = createRow(
    new ButtonBuilder({
      customId: "verification/start",
      style: ButtonStyle.Primary,
      label: "Iniciar Verificação",
    })
  );

  return {
    embeds: [embed],
    components: [row],
  } satisfies InteractionReplyOptions;
}
