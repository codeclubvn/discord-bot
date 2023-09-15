import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres',
    dialectOptions: {
        keepAlive: true,
    },
    logging: false,
    // SQLite only
    // storage: 'database.sqlite',
});

export const Channels = sequelize.define('channels', {
    guildId: {
        type: DataTypes.STRING,
    },
    channelId: {
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

export const Appreciate = sequelize.define('appreciate',{
    userId:{
        type: DataTypes.STRING,
        unique: true,
    },
    count:{
        type: DataTypes.INTEGER,
    }
})