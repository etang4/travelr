import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength,
  maxLength,
  email,
} from 'utils/validation';

const signupValidation = createValidator({
  name: [required, minLength(6), maxLength(25)],
  email: [required, email],
  password: [required, minLength(6), maxLength(30)],
  age: required,
});
export default memoize(10)(signupValidation);
