import AppError from './../utils/appError.js';

const handleDbCastError = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDbDuplicate = (err) => {
	const message = `'${err.keyValue.name}' already exists`;
	return new AppError(message, 400);
};

const handleDbValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message).join('. ');
	const message = `Invalid Data: ${errors}`;
	return new AppError(message, 400);
};

const sendErrDev = (err, res) => {
	res.status(err.statusCode).json({
		message: err.message,
		error: err,
		stack: err.stack
	});
};

const sendErrProd = (err, res) => {
	// Trusted Error: Send Error to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message
		});
		// Programming Error or any unknown error
	} else {
		// Log Error to console
		console.log('Some Error Occured', err);
		// Send generic error message
		res.status(500).json({
			message: 'Something went wrong'
		});
	}
};

const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	if (process.env.NODE_ENV === 'development') {
		sendErrDev(err, res);
	}

	if (process.env.NODE_ENV === 'production') {
		if (err.name === 'CastError') err = handleDbCastError(err);
		if (err.code === '11000') err = handleDbDuplicate(err);
		if (err.name === 'ValidationError') err = handleDbValidationError(err);

		sendErrProd(err, res);
	}
};

export { errorHandler };
