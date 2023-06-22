import express, { Router } from 'express';
import {
  getUserGroups,
  getUserGroup,
  addUsersToGroup
} from '../controllers/user-group.controller';

const userGroupRouter: Router = express.Router();

userGroupRouter.get('/user-group', getUserGroups);
userGroupRouter.get('/user-group/:id', getUserGroup);
userGroupRouter.post('/groups/:id', addUsersToGroup);

export default userGroupRouter;
