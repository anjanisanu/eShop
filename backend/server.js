import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import AppError from './utils/appError.js';

dotenv.config();
const app = express();
connectDB();

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/products', productRoutes);

app.all('*', (req, res, next) => {
	next(new AppError(`${req.originalUrl} does not exists`, 404));
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({
		message: err.message
	});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
