import express from 'express';
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getAllOrders
} from './../controllers/orderController.js';
import { protect, isAdmin } from './../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(isAdmin, getAllOrders).post(addOrderItems);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

export default router;
