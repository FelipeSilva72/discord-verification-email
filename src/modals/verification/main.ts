import { createModalInput } from "@magicyan/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";

export function verificationMainModal() {
  return new ModalBuilder({
    customId: "verification/start",
    title: "Início da Verificação",
    components: [
      createModalInput({
        customId: "email",
        label: "Email",
        placeholder: "Por favor, informe seu email para continuar",
        maxLength: 100,
        minLength: 1,
        style: TextInputStyle.Short,
        required,
      }),
    ],
  });
}
