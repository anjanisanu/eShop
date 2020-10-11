import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/products', productRoutes);

app.all('*', (req, res, next) => {
	res.status(404).json({
		message: `Cannot find ${req.originalUrl}`
	});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
