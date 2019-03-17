import { authCheck } from '../../services/auth';

export default {
  async Query(resolve, root, args, context, info) {
    const mutationField = info.schema.getQueryType().getFields()[
      info.fieldName
    ];

    const user = await authCheck(context.req);
    context.user = user;

    if (mutationField.authentication) {
      if (!user) {
        throw new Error('Anauthenticated');
      }
    }

    return resolve(root, args, context, info);
  },
};
