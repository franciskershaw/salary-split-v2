import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

import {
  createUser,
  loginUser,
  checkRefreshToken,
  logoutUser,
  getUserInfo,
  editUser,
} from '../controllers/userController';

import { isLoggedIn } from '../middleware/authMiddleware';

router
  .route('/')
  .post(asyncHandler(createUser))
  .put(isLoggedIn, asyncHandler(editUser))
  .get(isLoggedIn, asyncHandler(getUserInfo));

router.route('/login').post(asyncHandler(loginUser));

router.route('/refreshToken').get(checkRefreshToken);

router.route('/logout').post(logoutUser);

export default router;
