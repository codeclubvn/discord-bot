import { Events } from 'discord.js';
import { sequelize } from '../db.js';

export const name = Events.ClientReady;
export const once = true
export const execute = async (client) => {
    try {
        console.log('duy try sequel')
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    console.log(`Ready! Logged in as ${client.user.tag}`);
}