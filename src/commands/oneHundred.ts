import { Command } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction, MessageEmbed } from "discord.js";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";


export const oneHundred: Command = {
    data: new SlashCommandBuilder()
        .setName("100")
        .setDescription("Will track your progress in the 100 days of code challenge")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("El mensaje que quieres enviar")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const text = interaction.options.getString("message", true);

        const targetCamper = await getCamperData(user.id);
        const updateCamper = await updateCamperData(targetCamper);
        const oneHundedEmbed = new MessageEmbed();
        oneHundedEmbed.setTitle("100 Days of Code");
        oneHundedEmbed.setDescription(text);
        oneHundedEmbed.setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL(),
        });
        
        oneHundedEmbed.addFields([
            {
                name: 'round',
                value: updateCamper.round.toString(),
                inline: true
            },
            {
                name: 'Day',
                value: updateCamper.day.toString(),
                inline: true
            }
        ]);

        
        oneHundedEmbed.setFooter({
            text:
            `day completed: ${new Date(updateCamper.timestamp).toLocaleDateString()}`,
        });

        await interaction.editReply({
            embeds: [oneHundedEmbed],
        });
        
    },
};