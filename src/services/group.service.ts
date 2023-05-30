import { Group, Permission } from '../utils/shapes';
import GroupModel from '../models/group.model';

async function createGroup(name: string, permissions: Array<Permission>) {
  await GroupModel.create({ name, permissions });
}

async function getAllGroup() {
  const groups = await GroupModel.findAll();
  return groups;
}

async function deleteGroup(id: number) {
  try {
    const status = await GroupModel.destroy({ where: { id } });
    return status;
  } catch (error: unknown) {
    console.error(error);
  }
}

async function updateGroup(group: Group) {
  const { id, name, permissions } = group;
  try {
    await GroupModel.update({ id, name, permissions }, { where: { id } });
  } catch (error: unknown) {
    console.error(error);
  }
}

async function getGroup(id: number) {
  const group = await GroupModel.findByPk(id);
  return group;
}

export default class GroupService {
  createGroup = createGroup;
  getAllGroup = getAllGroup;
  deleteGroup = deleteGroup;
  getGroup = getGroup;
  updateGroup = updateGroup;
}
