import 'dotenv/config';
import express from 'express';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware
} from 'discord-interactions';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;


app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), (req, res) => {
    const message = req.body;
    if (message.type === InteractionType.APPLICATION_COMMAND) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Hello world',
            },
        });
    }
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
