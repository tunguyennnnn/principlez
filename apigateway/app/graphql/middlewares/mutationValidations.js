import * as yup from 'yup';
import * as mutationValidators from './validators';

export default {
  async Mutation(resolve, root, args, context, info) {
    const validator = mutationValidators[info.fieldName];
    if (validator) {
      try {
        const values = await validator.validate(args);
        return resolve(root, values, context, info);
      } catch (error) {
        return { error: error.toString() };
      }
    }
    return resolve(root, args, context, info);
  },
};
