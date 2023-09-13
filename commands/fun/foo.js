import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('foo')
    .setDescription('foo-bar')

export const execute = async (interaction) => {
    return interaction.reply('Bar!');
}