export default {
  LearningArea: {
    owner: async (learningArea, args, { models }) => {
      return models.User.findOne({ where: { id: learningArea.userId } });
    },
    items: async (learningArea, args, { models }) => {
      return models.ItemToLearn.findAll({
        where: { learningAreaId: learningArea.id },
      });
    },
  },
  Query: {
    learningAreas: async (root, { userId }, { models, user }) => {
      return models.LearningArea.findAll({
        where: { userId: userId || user.id },
      });
    },
  },
  Mutation: {
    createLearningArea: {
      authentication: true,
      resolve: async (root, { name, description }, { models, user }) => {
        return await models.LearningArea.create({
          userId: user.id,
          name,
          description,
        });
      },
    },
    deleteLearningArea: {
      authentication: true,
      resolve: async (root, { id }, { models, user }) => {
        const learningArea = await models.LearningArea.findOne({
          where: {
            id,
            userId: user.id,
          },
        });
        if (!learningArea) {
          return {
            error: 'Anauthorized',
          };
        }

        const learningItemCount = await learningArea.countItems();

        if (learningItemCount === 0) {
          await models.LearningArea.destroy({ where: { id } });
          return {};
        }

        return { error: 'Cannot be deleted' };
      },
    },
  },
};
