import { sq } from '../data-access/db';
import { DataTypes } from 'sequelize';

const GroupModel = sq.define('groups', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true
    },
    name: {
        type: DataTypes.STRING
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
});

export default GroupModel;