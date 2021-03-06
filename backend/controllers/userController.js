import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import generateToken from './../utils/generateToken.js';

export const authUser = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.comparePasswords(password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		return next(new AppError('Invalid Credentials', 401));
	}
});

export const registerUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) return next(new AppError('User with this email already exists', 401));

	const user = await User.create({ name, email, password });
	res.status(201).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		token: generateToken(user._id)
	});
});

export const getUserProfile = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		return next(new AppError('No user found. Plese login', 401));
	}

	res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin
	});
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		return next(new AppError('No user found. Plese login', 401));
	}

	user.name = req.body.name || user.name;
	user.email = req.body.email || user.email;

	if (req.body.password) {
		user.password = req.body.password;
	}

	const updatedUser = await user.save();

	res.status(200).json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: generateToken(updatedUser._id)
	});
});

export const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.json(users);
});

export const getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).select('name email isAdmin');
	if (!user) return next(new AppError('No user found with that ID', 401));

	res.json(user);
});

export const deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) return next(new AppError('Could not find user with that id', 404));

	res.status(204).json({ message: 'User Removed' });
});

export const updateUser = catchAsync(async (req, res, next) => {
	let { name, email, isAdmin } = req.body;

	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new AppError('No user found with that ID', 401));
	}

	if (!name) name = user.name;
	if (!email) email = user.email;
	if (isAdmin === undefined) isAdmin = user.isAdmin;

	const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, isAdmin }, { new: true });

	res.status(200).json(updatedUser);
});
