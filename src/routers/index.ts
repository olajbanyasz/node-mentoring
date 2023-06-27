import userRouter from './user-router';
import homeRouter from './home-router';
import errorRouter from './error-router';
import groupRouter from './group-router';
import userGroupRouter from './user-group-router';
import loginRouter from './login-router';

const routers = [userRouter, homeRouter, groupRouter, userGroupRouter, loginRouter, errorRouter];

export default routers;
