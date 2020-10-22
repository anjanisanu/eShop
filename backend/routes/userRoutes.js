import express from 'express';
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	getUser,
	deleteUser
} from './../controllers/userController.js';
import { protect, isAdmin } from './../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.use(protect, isAdmin);
router.route('/:id').get(getUser).delete(deleteUser);

export default router;
