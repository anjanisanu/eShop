import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log(`MongoDB Connected: ${con.connection.host}`);
	} catch (err) {
		console.log(`Error: ${err.message}`);
		process.exit(1);
	}
};

export default connectDB;
