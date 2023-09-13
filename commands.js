import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const HELLO_COMMAND = {
    name: 'hello',
    description: 'Hello bois',
    type: 1,
};

const AVATAR_COMMAND = {
    name: 'avatar',
    description: 'Generate Code Club Vietnam avatar',
    type: 1,
};

const ALL_COMMANDS = []

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);