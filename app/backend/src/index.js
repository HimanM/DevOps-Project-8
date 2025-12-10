const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});

app.get('/api/data', (req, res) => {
    res.json({
        data: 'Here is some data from the backend.',
        env_info: process.env.DB_HOST ? 'Environment variables loaded' : 'No DB_HOST env var found'
    });
});

app.listen(port, () => {
    console.log(`Backend app listening on port ${port}`);
});
