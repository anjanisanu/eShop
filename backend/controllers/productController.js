import Product from './../models/productModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const getProducts = catchAsync(async (req, res, next) => {
	const products = await Product.find();
	res.json(products);
});

export const getProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) return next(new AppError('Product Not found', 404));

	res.status(200).json(product);
});

export const deleteProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findByIdAndRemove(req.params.id);

	if (!product) return next(new AppError('No product found with that ID', 400));

	res.status(204).json({ message: 'Product Deleted.' });
});
