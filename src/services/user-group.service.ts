import User_Group from '../models/userGroup.model';
import { sq } from '../data-access/db';

async function getUserGroups() {
  const groups = await User_Group.findAll();
  return groups;
};

async function getUserGroup(id: number) {
  const group = await User_Group.findAll({ where:{ groupId: id }});
  return group;
};

async function addUsersToGroup(groupId: string, userIds: Array<string>) {
    console.log('data : ', userIds, groupId);
    try {
      const result = await sq.transaction(async (t) => {
        for (const userId of userIds) {
          await User_Group.create({ userId, groupId }, { transaction: t });
        }
      });
      console.warn('result: ', result)
    } catch (error) {
      throw new Error();
    }
  };

export default class GroupService {
  getUserGroup = getUserGroup;
  getUserGroups = getUserGroups;
  addUsersToGroup = addUsersToGroup;
};
