import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'Please provide your name' ]
		},
		email: {
			type: String,
			required: [ true, 'Please provide your email address' ],
			unique: [ true, 'This email is taken. Please use another.' ]
		},
		password: {
			type: String,
			required: [ true, 'Please provide your password' ]
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
);

userSchema.methods.comparePasswords = async function(enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
