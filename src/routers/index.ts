import userRouter from './user-router';
import homeRouter from './home-router';
import errorRouter from './error-router';
import groupRouter from './group-router';
import userGroupRouter from './user-group-router';

const routers = [userRouter, homeRouter, groupRouter, userGroupRouter, errorRouter];

export default routers;
