import UserGroupService from '../services/user-group.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const userGroupService = new UserGroupService();

export async function getUserGroups(request: Request, response: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groups : any[] = await userGroupService.getUserGroups();
    response.status(StatusCodes.OK).json(groups);
  } catch (error) {
    return next(error);
  }
};

export async function getUserGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const id = Number(request.params.id);
    const userGroup = await userGroupService.getUserGroup(id);
    response.status(StatusCodes.OK).json(userGroup);
  } catch (error) {
    return next(error);
  }
};

export async function addUsersToGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const groupId : string = request.params.id;
    const userIds : Array<string> = request.body.users;
    await userGroupService.addUsersToGroup(groupId, userIds)
    response.status(StatusCodes.OK).json('Users added to group');
  } catch (error) {
    return next(error);
  }
};
