import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();
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

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));