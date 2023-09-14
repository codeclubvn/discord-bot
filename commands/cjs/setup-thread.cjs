const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-thread')
        .setDescription('Đăng ký kênh tạo thread!'),
    execute: async function execute(interaction) {
        // console.log('duy Channels', Channels)
        return interaction.reply('Dạ đã đăng ký thành công thưa sếp! 🫶');
    },
};