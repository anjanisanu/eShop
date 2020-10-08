const express = require('express');
const products = require('./data/products');
const app = express();

app.get('/', (req, res) => {
	res.send('API is running');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.status(200).json(product);
});

app.listen(8080, console.log('Server Running on PORT 8080'));
