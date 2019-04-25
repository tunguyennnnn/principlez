import * as Validators from './validators';
import { authCheck } from '../../services/auth';

export default {
  async Query(resolve, root, args, context, info) {
    const queryField = info.schema.getQueryType().getFields()[info.fieldName];

    const user = await authCheck(context.req);
    context.user = user;

    if (queryField.authentication) {
      if (!user) {
        throw new Error('Anauthenticated');
      }
    }

    const validator = Validators[info.fieldName];
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
