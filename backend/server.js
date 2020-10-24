import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import AppError from './utils/appError.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.all('*', (req, res, next) => {
	next(new AppError(`${req.originalUrl} does not exists`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
