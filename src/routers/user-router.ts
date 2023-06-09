import express, { Router } from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
} from '../controllers/user.controller';
import userCheck from '../middlewares/user-check';
import verifyToken from '../middlewares/authentication';

import { userSchema } from '../models/userSchema';
import { createValidator } from 'express-joi-validation';
const userValidator = createValidator();

const userRouter: Router = express.Router();

userRouter.get('/users', verifyToken, getUsers);
userRouter.get('/users/:id', userCheck(), getUser);
userRouter.delete('/users/:id', userCheck(), deleteUser);
userRouter.post('/users', userValidator.body(userSchema), addUser);
userRouter.put('/users/:id', userCheck(), updateUser);

export default userRouter;
