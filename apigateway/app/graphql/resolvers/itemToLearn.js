export default {
  ItemToLearn: {
    owner: async (item, args, { models }) => {
      return await models.User.findOne({ where: { id: item.userId } });
    },
    isAuthor: (item, args, { user }) => {
      return item.userId === user.id;
    },
    learnNote: async (item, args, { models }) => {
      const [learnNote] = await models.LearnNote.findOrCreate({
        where: {
          itemToLearnId: item.id,
        },
      });
      return learnNote;
    },
  },
  Query: {
    itemToLearn: async (root, { id }, { models, user }) => {
      return models.ItemToLearn.findOne({ where: { id } });
    },
    newLearningItems: async (
      root,
      { userId, learningAreaId = null, limit, cursor },
      { models, user },
    ) => {
      userId = userId || user.id;
      const options = {
        where: {
          userId,
          learningAreaId,
        },
        order: [['id', 'ASC']],
        limit,
      };

      if (cursor) {
        options.where.id = { $gt: cursor };
      }

      const items = await models.ItemToLearn.findAll(options);
      const count = await models.ItemToLearn.count({
        where: { userId, learningAreaId },
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
    deleteItemToLearn: {
      authentication: true,
      resolve: async (root, { id }, { models, user }) => {
        await models.ItemToLearn.destroy({ where: { id, userId: user.id } });
        return {};
      },
    },
    updateLearnNote: {
      authentication: true,
      resolve: async (root, { id, body }, { models, user }) => {
        const itemToLearn = await models.ItemToLearn.findOne({
          where: { id, userId: user.id },
        });
        if (!itemToLearn) {
          throw new Error('Not found');
        }

        const learnNote = await itemToLearn.getLearnNote();

        return await learnNote.update({ body });
      },
    },
  },
};
