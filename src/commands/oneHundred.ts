import { Command } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";
export const oneHundred: Command = {
    data: new SlashCommandBuilder()
        .setName("100")
        .setDescription("Will track your progress in the 100 days of code challenge")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message you want to send")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const message = interaction.options.getString("message");
    },
};