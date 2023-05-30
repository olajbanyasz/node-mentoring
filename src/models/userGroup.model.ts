import { sq } from '../data-access/db';
import User from '../models/user.model';
import Group from '../models/group.model';

const User_Group = sq.define('User_Group', {}, {
    tableName:'user-group',
    timestamps:false,
});

Group.belongsToMany(User,{ through: User_Group, onUpdate:'CASCADE',onDelete:'CASCADE' });
User.belongsToMany(Group,{ through: User_Group, onUpdate:'CASCADE',onDelete:'CASCADE' });

export default User_Group;