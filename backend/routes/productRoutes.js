import express from 'express';
import Product from './../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product)
			return res.status(404).json({
				message: 'Product Not Found'
			});
		res.status(200).json(product);
	} catch (err) {
		res.status(401).json({
			status: 'fail',
			error: err.stack
		});
	}
});

export default router;
