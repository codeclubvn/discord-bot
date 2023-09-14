import { Events } from 'discord.js';
import { sequelize, Channels } from '../db.js';

export const name = Events.ClientReady;
export const once = true
export const execute = async (client) => {
    try {
        await sequelize.authenticate();
        Channels.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Ready! Logged in as ${client.user.tag}`);
}