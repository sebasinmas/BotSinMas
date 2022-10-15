require("dotenv").config();
import { Client, Intents, Interaction } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { validateEnvs } from './utils/ValidateEnv';
import { connectDatabase } from './database/connectDatabase';
import { onInteraction } from './events/onInteraction';
import { onReady } from "./events/onReady";

(async () => {
  if (!validateEnvs()) return;

  const BOT = new Client({ intents: IntentOptions });

  BOT.on("ready", async () => await onReady(BOT));

  BOT.on(
    "interactionCreate",
    async (interaction) => {
      await onInteraction(interaction);

    }
  );
  await connectDatabase();

  await BOT.login(process.env.BOT_TOKEN);




})();