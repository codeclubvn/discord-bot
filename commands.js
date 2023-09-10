import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const HELLO_COMMAND = {
    name: 'hello',
    description: 'Hello bois',
    type: 1,
};

InstallGlobalCommands(process.env.APP_ID, [HELLO_COMMAND]);