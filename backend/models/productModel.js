import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'A review must have a name' ]
		},
		rating: {
			type: String,
			required: [ true, 'Please provide rating of this product' ]
		},
		comment: {
			type: String,
			required: [ true, 'Please provide your feedback for this product' ]
		}
	},
	{
		timestamps: true
	}
);

const productSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String,
			required: [ true, 'A product must have a name' ]
		},
		image: {
			type: String,
			required: [ true, 'A product must have an image' ]
		},
		brand: {
			type: String,
			required: [ true, 'Please specify product brand' ]
		},
		category: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		review: [ reviewSchema ],
		rating: {
			type: Number,
			required: true,
			default: 0
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0
		},
		price: {
			type: Number,
			required: true,
			default: 0
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Product', productSchema);
