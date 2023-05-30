import UserGroupService from '../services/user-group.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const userGroupService = new UserGroupService();

export async function getUserGroups(req: Request, res: Response) {
    const groups : any[] = await userGroupService.getUserGroups();
    res.status(StatusCodes.OK).json(groups);
};

export async function getUserGroup(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const userGroup = await userGroupService.getUserGroup(id);
    res.status(StatusCodes.OK).json(userGroup);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json('Group does not exist');
  }
};

export async function addUsersToGroup(req: Request, res: Response): Promise<void> {
  const groupId : string = req.params.id;
  const userIds : Array<string> = req.body.users;
  await userGroupService.addUsersToGroup(groupId, userIds)
  res.status(StatusCodes.OK).json('Users added to group');
};
