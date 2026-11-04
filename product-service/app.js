const express = require('express');

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Mobile', price: 25000 },
    { id: 3, name: 'Headphones', price: 2000 }
];

app.get('/', (req, res) => {
    res.json({
        service: 'Product Service',
        status: 'Running'
    });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

const PORT = 3002;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Product Service running on port ${PORT}`);
});
