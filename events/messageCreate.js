import { Events } from 'discord.js';

export const name = Events.MessageCreate;
export const execute = async (message) => {
    const channelIds = []
   
	console.log(message.author.tag + ' sent: ' + message.content);
}