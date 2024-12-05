import { bootstrapApp } from "#base";

const { MAIN_GUILD_ID } = process.env;

await bootstrapApp({
  workdir: import.meta.dirname,
  commands: {
    guilds: [MAIN_GUILD_ID],
  },
  loadLogs: false,
});
