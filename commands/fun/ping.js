import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping')

export const execute = async (interaction) => {
    return interaction.reply('Pong!');
}