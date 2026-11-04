const express = require('express');

const app = express();
app.use(express.json());

const users = [
    { id: 1, name: 'Vennela', email: 'vennela@example.com' },
    { id: 2, name: 'Rahul', email: 'rahul@example.com' }
];

app.get('/', (req, res) => {
    res.json({
        service: 'User Service',
        status: 'Running'
    });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

const PORT = 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`User Service running on port ${PORT}`);
});
