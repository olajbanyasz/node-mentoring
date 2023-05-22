import { userSchema } from '../models/user';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

function userValidator() {
    console.log('*****', arguments)
  return validator.query(userSchema);
}

export default userValidator;
