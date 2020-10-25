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

export const getOrderById = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate({
		path: 'user',
		select: 'name email'
	});
	if (!order) return next(new AppError('No Order found', 404));

	res.status(200).json(order);
});

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) return next(new AppError('No Order found', 404));

	order.isPaid = true;
	order.paidAt = Date.now();
	order.paymentResult = {
		id: req.body.id,
		status: req.body.status,
		update_time: req.body.update_time,
		email_address: req.body.payer.email_address
	};

	const upatedOrder = await order.save();

	res.status(200).json(upatedOrder);
});

export const getMyOrders = catchAsync(async (req, res, next) => {
	const orders = await Order.find({ user: req.user._id });

	if (!orders) return next(new AppError('You have not ordered any items yet', 404));

	res.status(200).json(orders);
});

export const getAllOrders = catchAsync(async (req, res, next) => {
	const orders = await Order.find().populate('user', 'id name');
	res.status(200).json(orders);
});
