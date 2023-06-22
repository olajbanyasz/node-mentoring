import GroupService from '../services/group.service';
import { Request, Response } from 'express';
import { Group, Permission } from '../utils/shapes';
import { StatusCodes } from 'http-status-codes';

const groupService = new GroupService();

export async function getGroups(req: Request, res: Response) {
    const groups : Group[] | any[] = await groupService.getAllGroup();
    res.status(StatusCodes.OK).json(groups);
}

export async function addGroup(req: Request, res: Response): Promise<void> {
  const name: string = req.body.name;
  const permissions: Array<Permission> = req.body.permissions;
  await groupService.createGroup(name, permissions);
  res.status(StatusCodes.OK).json('New group is created');
}

export async function deleteGroup(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  await groupService.deleteGroup(id);
  res.status(StatusCodes.OK).json('Group is deleted');
}

export async function getGroup(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const group = await groupService.getGroup(id);
    res.status(StatusCodes.OK).json(group);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json('Group does not exist');
  }
}

export async function updateGroup(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const group: Group | any = await groupService.getGroup(id);
  const updatedGroup = Object.assign({}, group, req.body);
  await groupService.updateGroup(updatedGroup);
  res.status(StatusCodes.OK).json('Update success');
}
