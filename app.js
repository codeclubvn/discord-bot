// Require the necessary discord.js classes
import express from 'express';
import 'dotenv/config';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware
} from 'discord-interactions';
import fs from 'node:fs'
import path from 'node:path'
import { Client, Collection, Events, GatewayIntentBits,  } from 'discord.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Channels } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

client.once(Events.ClientReady, () => {
	Channels.sync();
	console.log('Ready!');
});

client.on(Events.MessageCreate, async interaction => {
	const { commandName } = interaction;

	if (commandName === 'pong') {
		const tagName = interaction.options.getString('name');
		const tagDescription = interaction.options.getString('description');

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				name: tagName,
				description: tagDescription,
				username: interaction.user.username,
			});

			return interaction.reply(`Tag ${tag.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}

			return interaction.reply('Something went wrong with adding a tag.');
		}
	}
});

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
        const command = await import(filePath);
		if (command.data && command.execute) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	let event = await import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const app = express();
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), (req, res) => {
    const message = req.body;
    if (true) {
    // if (message.type === InteractionType.APPLICATION_COMMAND) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Hello world',
            },
        });
    }
});

client.login(process.env.DISCORD_TOKEN);