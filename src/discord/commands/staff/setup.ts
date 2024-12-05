import { Command } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { log } from "#settings";
import { createLinkButton, createRow } from "@magicyan/discord";
import { ApplicationCommandOptionType, ChannelType } from "discord.js";

new Command({
  name: "setup",
  description: "Comando de Setup",
  defaultMemberPermissions: ["Administrator"],
  options: [
    {
      name: "verificação",
      description: "Comando para enviar o sistema de verificação",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "canal",
          description: "Por favor, selecione um canal",
          type: ApplicationCommandOptionType.Channel,
          channelTypes: [ChannelType.GuildText],
          required,
        },
      ],
    },
  ],
  async run(interaction) {
    await interaction.deferReply({ ephemeral });

    const { options } = interaction;
    const subCommand = options.getSubcommand(true);

    switch (subCommand) {
      case "verificação": {
        const channel = options.getChannel("canal", true, [
          ChannelType.GuildText,
        ]);

        await channel
          .send(menus.verification.main())
          .then(async (message) => {
            const row = createRow(
              createLinkButton({
                url: message.url,
                label: "Ir Para Mensagem",
              })
            );

            await interaction.editReply(
              res.success("Parabéns, o sistema foi enviado com sucesso", {
                components: [row],
              })
            );
          })
          .catch(async (err) => {
            log.error(err);
            await interaction.editReply(
              res.danger("Desculpe, não foi possível enviar o sistema")
            );
          });
        return;
      }
    }
  },
});
