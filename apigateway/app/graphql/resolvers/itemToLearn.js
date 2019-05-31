export default {
  ItemToLearn: {
    owner: async (item, args, { models }) => {
      return await models.User.findOne({ where: { id: item.userId } });
    },
  },
  Query: {
    newLearningItems: async (
      root,
      { userId, limit, cursor },
      { models, user },
    ) => {
      userId = userId || user.id;
      const options = {
        where: {
          userId,
          learningAreaId: null,
        },
        order: [['id', 'ASC']],
        limit,
      };

      if (cursor) {
        options.where.id = { $gt: cursor };
      }

      const items = await models.ItemToLearn.findAll(options);
      const count = await models.ItemToLearn.count({
        where: { userId, learningAreaId: null },
      });

      return {
        pageInfo: {
          total: count,
          hasNextPage: items.length >= limit,
          hasPreviousPage: !!cursor,
        },
        edges: items.map(item => ({
          cursor: item.id,
          node: item,
        })),
      };
    },
  },
  Mutation: {
    createItemToLearn: {
      authentication: true,
      resolve: async (
        root,
        { name, description, source, learningAreaId },
        { models, user },
      ) => {
        if (learningAreaId) {
          const learningArea = await models.LearningArea.findOne({
            where: { id: learningAreaId },
          });
          if (!learningArea) {
            throw new Error('Cannot find leaning area');
          }
        }

        return await models.ItemToLearn.create({
          name,
          description,
          source,
          learningAreaId,
          userId: user.id,
        });
      },
    },
  },
};
