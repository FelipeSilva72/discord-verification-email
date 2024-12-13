import { URLStore } from "#base";
import { verificationGenerateCode } from "#functions";
import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { InteractionReplyOptions, StringSelectMenuBuilder } from "discord.js";

type EmailUrlStore = {
  code: string;
};

export function verificationPanelMenu(url: URLStore<EmailUrlStore>) {
  const embed = createEmbed({
    url,
    description: "Por favor, selecine o código no menu abaixo",
    color: settings.colors.primary,
  });

  const realCode = url.get("code") as string;
  const fakeCodeOne = verificationGenerateCode();
  const fakeCodeTwo = verificationGenerateCode();

  const codes = shuffleCode([realCode, fakeCodeOne, fakeCodeTwo]);

  const row = createRow(
    new StringSelectMenuBuilder({
      customId: "verification/code",
      placeholder: "Selecionar código",
      options: codes.map((code) => ({
        label: code,
        value: code,
      })),
    })
  );

  return {
    embeds: [embed],
    components: [row],
  } satisfies InteractionReplyOptions;
}

function shuffleCode(codes: string[]) {
  for (let i = codes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [codes[i], codes[j]] = [codes[j], codes[i]];
  }
  return codes;
}
