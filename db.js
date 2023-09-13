import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('database', 'admin', 'adminpassword', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

export const Channels = sequelize.define('channels', {
	server: {
		type: Sequelize.STRING,
	},
    channel: {
		type: Sequelize.STRING,
        unique: true,
	},
});