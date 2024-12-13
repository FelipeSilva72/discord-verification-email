import { Responder, ResponderType, URLStore } from "#base";
import { res, sendEmailCode, verificationGenerateCode } from "#functions";
import { menus } from "#menus";
import { brBuilder } from "@magicyan/discord";
import { z } from "zod";

const verificationSchema = z.object({
  email: z.string().email("Desculpe, o email está inválido"),
});

type EmailUrlStore = {
  code: string;
};

new Responder({
  customId: "verification/start",
  type: ResponderType.ModalComponent,
  cache: "cached",
  async run(interaction) {
    await interaction.deferReply({ ephemeral });

    const { fields, guild } = interaction;

    const email = fields.getTextInputValue("email");
    const verificadoParsed = verificationSchema.safeParse({ email });

    if (!verificadoParsed.success) {
      const errors = verificadoParsed.error.errors.map(
        (err) => `- ${err.message}`
      );

      await interaction.editReply(
        brBuilder("Desculpe, o formulário tem campos inválido(s)", errors)
      );
      return;
    }

    const code = verificationGenerateCode();

    const { error } = await sendEmailCode(email, code, guild);

    if (error) {
      await interaction.editReply(
        res.warning(
          "Desculpe, ocorreu um erro ao tentar enviar o código de verificação"
        )
      );
      return;
    }

    const urlStore = new URLStore<EmailUrlStore>();
    urlStore.set("code", code);

    await interaction.editReply(menus.verification.panel(urlStore));
  },
});
