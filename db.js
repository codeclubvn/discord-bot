import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres',
    logging: false,
    // SQLite only
    // storage: 'database.sqlite',
});

export const Channels = sequelize.define('channels', {
    server: {
        type: DataTypes.STRING,
    },
    channel: {
        type: DataTypes.STRING,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.STRING,
    }
});
