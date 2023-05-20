import { sq } from '../data-access/db';
import { DataTypes } from 'sequelize';

const UserModel = sq.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true
    },
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    age: {
        type: DataTypes.INTEGER
    }
});

export default UserModel;
