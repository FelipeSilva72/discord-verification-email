import { Responder, ResponderType } from "#base";
import { res } from "#functions";
import { modals } from "#modals";
import { settings } from "#settings";
import { findRole } from "@magicyan/discord";

const verificationRoleId = settings.verification.roleId;

new Responder({
  customId: "verification/start",
  type: ResponderType.Button,
  cache: "cached",
  async run(interaction) {
    const { guild, member } = interaction;

    const verificationRole = findRole(guild).byId(verificationRoleId);

    if (!verificationRole) {
      await interaction.reply(
        res.warning("Desculpe, esse sistema não está configurado")
      );
      return;
    }

    if (member.roles.cache.has(verificationRole.id)) {
      await interaction.reply(res.warning("Desculpe, você já está verificado"));
      return;
    }

    await interaction.showModal(modals.verification.main());
  },
});
