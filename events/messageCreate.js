import { Events } from 'discord.js';
import { client } from '../startup.js'
import { Channels } from '../db.js'

export const name = Events.MessageCreate;
export const execute = async (message) => {
    if(message?.author?.bot) return
    const authorName = message?.author?.globalName
    console.log('duy message', message)
    console.log(message.author.tag + ' sent: ' + message.content);
    const channelId = message.channelId
    const channels = await Channels.findAll({
        where: { channelId: channelId },
    });
    console.log('duy channel', channels, channelId)
    console.log(message.author.tag + ' sent: ' + message.content);
    if (channels?.length > 0) {
        const thread = await message.channel.threads.create({
            name: `${authorName}-${Date.now()}|${message.content}`,
            autoArchiveDuration: 60,
            reason: `${authorName} muốn đặt câu hỏi`,
            startMessage: message.id
        });
        console.log(`Created thread: ${thread.name}`);
    }
}