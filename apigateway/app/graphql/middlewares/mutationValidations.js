import * as yup from 'yup';
import * as mutationValidators from './validators';
import { authCheck } from '../../services/auth';

export default {
  async Mutation(resolve, root, args, context, info) {
    const mutationField = info.schema.getMutationType().getFields()[
      info.fieldName
    ];

    const user = await authCheck(context.req);
    context.user = user;

    if (mutationField.authentication) {
      if (!user) {
        throw new Error('Anauthenticated');
      }
    }

    const validator = mutationValidators[info.fieldName];
    if (validator) {
      try {
        const values = await validator.validate(args);
        return resolve(root, values, context, info);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return {
            error: error.message,
          };
        } else {
          throw error;
        }
      }
    }
    return resolve(root, args, context, info);
  },
};
