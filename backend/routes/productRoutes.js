import express from 'express';
import { protect, isAdmin } from './../middleware/authMiddleware.js';
import {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
} from './../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id').get(getProduct).patch(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct);

export default router;
