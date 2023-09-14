import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { Channels } from '../../db.js'
import { client } from '../../startup.js'

export const data = new SlashCommandBuilder()
    .setName('setup-thread')
    .setDescription('Đăng ký kênh tạo thread!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const execute = async (interaction) => {
    const guildId = interaction.guildId;
    const channelId = interaction.channelId;
    const createdBy = interaction.user.id;

    try {
        const [createdChannel, created] = await Channels.findOrCreate({
            where: { channelId: channelId },
            defaults: {
                guildId: guildId,
                channelId: channelId,
                createdBy: createdBy,
                createdAt: new Date()
            }
        });

        if (created) {
            console.log('duy created')
            return interaction.reply(`Đã đăng ký kênh <#${channelId}> thành công thưa sếp!`);
        }

        return interaction.reply(`Kênh <#${channelId}> đã được đăng ký trước đó rồi thưa sếp!`);
    }
    catch (error) {
        console.log('duy setup-thread', error)
        return interaction.reply('Em hong hỉu');
    }
}
