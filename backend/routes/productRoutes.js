import express from 'express';
import Product from './../models/productModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

const router = express.Router();

router.get(
	'/',
	catchAsync(async (req, res) => {
		const products = await Product.find();
		res.json(products);
	})
);

router.get(
	'/:id',
	catchAsync(async (req, res, next) => {
		const product = await Product.findById(req.params.id);
		if (!product) return next(new AppError('Product Not found', 404));

		res.status(200).json(product);
	})
);

export default router;
