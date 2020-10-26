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

export const createProduct = catchAsync(async (req, res, next) => {
	// const { name, image, description, brand, category, price, countInStock } = req.body;
	const product = await Product.create({
		user: req.user._id,
		name: 'New Product',
		image: '/images/sample.jpg',
		description: 'Sample Description',
		brand: 'Sample Brand',
		category: 'Sample Category',
		price: 0,
		countInStock: 0
	});

	res.status(201).json(product);
});

export const updateProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) return next(new AppError('No product found with that ID', 404));

	const name = req.body.name || product.name;
	const image = req.body.image || product.image;
	const description = req.body.description || product.description;
	const brand = req.body.brand || product.brand;
	const category = req.body.category || product.category;
	const price = req.body.price || product.price;
	const countInStock = req.body.countInStock || product.countInStock;

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name,
			image,
			description,
			brand,
			category,
			price,
			countInStock
		},
		{ new: true }
	);

	res.status(200).json(updatedProduct);
});

export const deleteProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findByIdAndRemove(req.params.id);

	if (!product) return next(new AppError('No product found with that ID', 400));

	res.status(204).json({ message: 'Product Deleted.' });
});

export const createProductReview = catchAsync(async (req, res, next) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);
	if (!product) return next(new AppError('No product found with that ID', 404));

	const alreadyReviewd = product.review.find((r) => r.user.toString() === req.user._id.toString());

	if (alreadyReviewd) return next(new AppError('You have already reviewd this product', 400));

	const review = {
		name: req.user.name,
		rating: Number(rating),
		comment,
		user: req.user._id
	};

	product.review.push(review);
	product.numReviews = product.review.length;
	product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length;

	await product.save();

	res.status(201).json({ message: 'Review Added' });
});
