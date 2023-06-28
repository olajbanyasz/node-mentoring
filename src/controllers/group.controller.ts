import GroupService from '../services/group.service';
import { NextFunction, Request, Response } from 'express';
import { Group, Permission } from '../utils/shapes';
import { StatusCodes } from 'http-status-codes';

const groupService = new GroupService();

export async function getGroups(request: Request, response: Response, next: NextFunction) {
  try { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groups : Group[] | any[] = await groupService.getAllGroup();
    response.status(StatusCodes.OK).json(groups);
  } catch (error) {
    return next(error);
  }
}

export async function addGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const name: string = request.body.name;
    const permissions: Array<Permission> = request.body.permissions;
    await groupService.createGroup(name, permissions);
    response.status(StatusCodes.OK).json('New group is created');
  } catch (error) {
    return next(error);
  }
}

export async function deleteGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const id = Number(request.params.id);
    await groupService.deleteGroup(id);
    response.status(StatusCodes.OK).json('Group is deleted');
  } catch (error) {
    return next(error);
  }
}

export async function getGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const id = Number(request.params.id);
    const group = await groupService.getGroup(id);
    response.status(StatusCodes.OK).json(group);
  } catch (error) {
    return next(error);
  }
}

export async function updateGroup(request: Request, response: Response, next: NextFunction) {
  try {
    const id = Number(request.params.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group: Group | any = await groupService.getGroup(id);
    const updatedGroup = Object.assign({}, group, request.body);
    await groupService.updateGroup(updatedGroup);
    response.status(StatusCodes.OK).json('Update success');
  } catch (error) {
    return next(error);
  }
}
