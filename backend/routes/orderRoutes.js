import express from 'express';
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
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
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
