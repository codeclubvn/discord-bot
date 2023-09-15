import { SlashCommandBuilder } from 'discord.js'
import { Appreciate } from '../../db.js'

export const data = new SlashCommandBuilder()
    .setName('cam-on')
    .setDescription('Cảm ơn!')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('nguoi duoc cam on')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('decription')
            .setDescription('mô tả'))



export const execute = async (interaction) => {
    const target = interaction.options.getUser('target');
    const decription = interaction.options.getString('decription');

    const [appreciate, created] = await Appreciate.findOrCreate({
        where: { userId: target?.id },
        defaults: {
            userId: target?.id,
            count: 1
        }
    });

    let count = appreciate?.count

    if (!created) {
        count++

        await Appreciate.update({ count: count }, {
            where: {
                userId: target?.id
            }
        });
    }

    return interaction.reply(`<@${target?.id}> vừa nhậc được lời cảm ơn từ <@${interaction?.user?.id}> ${decription ? `"${decription}"` : ''}! <@${target?.id}> đã nhận được tổng cộng **${count} lời cảm ơn**!`);
}