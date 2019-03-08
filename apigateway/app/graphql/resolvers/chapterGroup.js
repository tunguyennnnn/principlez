export default {
  ChapterGroup: {
    chapters: async (chapterGroup, args, { models }) => {
      const { chapterListOrder } = chapterGroup;
      return models.Chapter.findAll({
        where: { id: chapterListOrder },
        attributes: ['id', 'title'],
      });
    },
  },
  Query: {
    chapterGroups: async (root, { userId }, { models, user }) => {
      try {
        return models.ChapterGroup.findAll({ where: { userId } });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
  Mutation: {
    createChapter: async (root, { type }, { models, user }) => {
      try {
        if (!user) {
          throw new Error('Anauthenticated');
        }

        const chapterGroup = await models.ChapterGroup.findOne({
          where: { userId: user.id, type },
        });
        if (!chapterGroup) {
          throw new Error('Not found type');
        }
        const { group, chapter } = await models.ChapterGroup.createNewChapter(
          chapterGroup,
        );
        return { chapterGroup: group, chapter };
      } catch (e) {
        throw e;
      }
    },
  },
};
