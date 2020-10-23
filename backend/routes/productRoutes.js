import express from 'express';
import { protect, isAdmin } from './../middleware/authMiddleware.js';
import { getProducts, getProduct, deleteProduct } from './../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProduct).delete(protect, isAdmin, deleteProduct);

export default router;
