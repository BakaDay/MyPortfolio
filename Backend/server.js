const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let messages = []; // Temporary in-memory storage, replace with a database in production

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (name && email && message) {
        const newMessage = { name, email, message, date: new Date() };
        messages.push(newMessage);
        console.log('Message received:', newMessage);
        res.status(200).send({ message: 'Message received successfully!' });
    } else {
        res.status(400).send({ message: 'All fields are required.' });
    }
});

app.get('/api/messages', (req, res) => {
    res.status(200).send(messages);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/messages', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Messages</title>
            </head>
            <body>
                <h1>Messages</h1>
                <ul>
                    ${messages.map(msg => `<li>${msg.date}: <strong>${msg.name}</strong> (${msg.email}): ${msg.message}</li>`).join('')}
                </ul>
            </body>
        </html>
    `);
});
