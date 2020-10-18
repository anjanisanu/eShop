import Order from './../models/orderModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const addOrderItems = catchAsync(async (req, res, next) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) return next(new AppError('No Order Items', 400));

	const order = new Order({
		orderItems,
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	});

	const createdOrder = await order.save();

	res.status(201).json(createdOrder);
});
