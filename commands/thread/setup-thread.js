import { SlashCommandBuilder,PermissionFlagsBits } from 'discord.js'
import { Channels } from '../../db.js'

export const data = new SlashCommandBuilder()
    .setName('setup-thread')
    .setDescription('Đăng ký kênh tạo thread!')

export const execute = async (interaction) => {
    console.log('duy interaction', interaction.guildId, interaction.channelId, interaction.user.id)

    return interaction.reply('Dạ đã đăng ký thành công thưa sếp! 🫶');
}