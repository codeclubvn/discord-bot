import { Events } from 'discord.js';
import { Channels } from '../db.js'

export const name = Events.MessageCreate;
export const execute = async (message) => {
    if(message?.author?.bot) return
    const authorName = message?.author?.globalName
    const channelId = message.channelId
    const channels = await Channels.findAll({
        where: { channelId: channelId },
    });
    if (channels?.length > 0) {
        const thread = await message.channel.threads.create({
            name: `${authorName}-${Date.now()}`,
            autoArchiveDuration: 60,
            reason: `${authorName} muốn đặt câu hỏi`,
            startMessage: message.id
        });
        console.log(`Created thread: ${thread.name}`);
    }
}