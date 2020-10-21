import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const protect = catchAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = await jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');
			return next();
		} catch (err) {
			return next(new AppError('Invalid Token, Authorization denied.', 401));
		}
	}

	if (!token) {
		return next(new AppError('Invalid Token, Authorization denied.', 401));
	}
});

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin === true) return next();
	next(new AppError('Not Authorized', 401));
};
