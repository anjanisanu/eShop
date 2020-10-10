import express from 'express';
import Product from './../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

router.get('/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);
	res.status(200).json(product);
});

export default router;
