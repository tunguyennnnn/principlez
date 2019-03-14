import * as yup from 'yup';
import * as mutationValidators from './validators';
import { authCheck } from '../../services/auth';

export default {
  async Mutation(resolve, root, args, context, info) {
    const mutationField = info.schema.getMutationType().getFields()[
      info.fieldName
    ];

    if (mutationField.authentication) {
      const user = await authCheck(context.req);
      if (!user) {
        throw new Error('Anauthenticated');
      }
      context.user = user;
    }

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
