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
};
