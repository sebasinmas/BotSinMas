import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";


export const edit: Command = {
    data: new SlashCommandBuilder()
        .setName("edit")
        .setDescription("edit a previous 100 days of code message")
        .addStringOption(option =>
            option.setName("embed-id")
                .setDescription("the id of the embed you want to edit")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("message")
                .setDescription("the new message you want to send")
                .setRequired(true)
        )

    , run: async (interaction) => {
        await interaction.deferReply();
        const { user, channel } = interaction;
        const targetId = interaction.options.getString("embed-id", true);
        const text = interaction.options.getString("message", true);
        if (!channel) {
            await interaction.editReply({
                content: "Missing channel parameter"
            });
            return;
        }

        let targetMessage: any;
        try {
            targetMessage = await channel.messages.fetch(targetId);
        } catch (error) {
            await interaction.editReply({
                content: "No es un id valido"
            });
            return;
        }



        

        const targetEmbed = targetMessage.embeds[0];

        if (targetEmbed.author?.name !== user.tag) {
            await interaction.editReply({
                content: "You can only edit your own messages."
            });

            return;

        }

        targetEmbed.setDescription(text);
        await targetMessage.edit({ embeds: [targetEmbed] });

        await interaction.editReply({
            content: "Message edited successfully"
        });
    }
};