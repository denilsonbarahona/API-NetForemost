import { IValidator } from 'types';
import { validate } from "class-validator";

class Validator implements IValidator {
    async validation<T extends object>(payload: T) {
      const response = await validate(payload)
      return response.length === 0;
    }
}

export default Validator;