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
  },
};
