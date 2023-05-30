import express, { Router } from 'express';
import {
  getGroups,
  getGroup,
  deleteGroup,
  addGroup,
  updateGroup,
} from '../controllers/group.controller';
import { groupSchema } from '../models/groupSchema';
import { createValidator } from 'express-joi-validation';

const groupValidator = createValidator();
const groupRouter: Router = express.Router();

groupRouter.get('/groups', getGroups);
groupRouter.get('/groups/:id', getGroup);
groupRouter.delete('/groups/:id', deleteGroup);
groupRouter.post('/groups', groupValidator.body(groupSchema), addGroup);
groupRouter.put('/groups/:id', updateGroup);

export default groupRouter;
