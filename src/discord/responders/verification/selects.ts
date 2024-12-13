import { Responder, ResponderType, URLStore } from "#base";
import { res, verificationSendLog } from "#functions";
import { log, settings } from "#settings";
import { createEmbed, findChannel, findRole } from "@magicyan/discord";

const verificationRoleId = settings.verification.roleId;
const verificationChannelLogsId = settings.verification.logsId;

type EmailUrlStore = {
  code: string;
};

new Responder({
  customId: "verification/code",
  type: ResponderType.StringSelect,
  cache: "cached",
  async run(interaction) {
    await interaction.deferUpdate();

    const { values, guild, member } = interaction;

    const embed = createEmbed({ from: interaction });
    const urlStore = new URLStore<EmailUrlStore>(embed.data.url);

    const [code] = values;
    const realCode = urlStore.get("code") as string;

    if (code !== realCode) {
      await interaction.editReply(
        res.primary("Desculpe, o código está inválido", {
          components: [],
        })
      );
      return;
    }

    const verificationRole = findRole(guild).byId(verificationRoleId);
    const verificationChannelLogs = findChannel(guild).byId(
      verificationChannelLogsId
    );

    if (!verificationRole || !verificationChannelLogs) {
      await interaction.editReply(
        res.warning("Desculpe, esse sistema não está configurado", {
          components: [],
        })
      );
      return;
    }

    await verificationSendLog({
      member,
      code,
      channelLogs: verificationChannelLogs,
    });

    await member.roles
      .add(verificationRole.id)
      .then(async () => {
        await interaction.editReply(
          res.success("Parabéns, o cargo foi adicionado com sucesso", {
            components: [],
          })
        );
      })
      .catch(async (err) => {
        log.error(err);
        await interaction.editReply(
          res.danger("Desculpe, não foi possível adicionar o cargo", {
            components: [],
          })
        );
      });
  },
});
