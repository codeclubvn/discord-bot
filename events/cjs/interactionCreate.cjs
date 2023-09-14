const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// if (!interaction.isChatInputCommand()) return;

        
		let command = interaction.client.commands.get(interaction.commandName);
        console.log('duy InteractionCreate', interaction.commandName)
        // command = command.default

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};