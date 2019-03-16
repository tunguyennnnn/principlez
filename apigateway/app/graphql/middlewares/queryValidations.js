import { authCheck } from '../../services/auth';

export default {
  async Query(resolve, root, args, context, info) {
    const mutationField = info.schema.getQueryType().getFields()[
      info.fieldName
    ];

    if (mutationField.authentication) {
      const user = await authCheck(context.req);
      if (!user) {
        throw new Error('Anauthenticated');
      }
      context.user = user;
    }

    return resolve(root, args, context, info);
  },
};
