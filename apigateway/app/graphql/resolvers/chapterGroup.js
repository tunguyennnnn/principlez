import _ from 'lodash';

export default {
  ChapterGroup: {
    chapters: async (chapterGroup, args, { models }) => {
      const { chapterListOrder } = chapterGroup;
      const chapters = await models.Chapter.findAll({
        where: { id: chapterListOrder },
        attributes: ['id', 'title'],
      });
      return _.sortBy(chapters, chapter => {
        return chapterListOrder.indexOf(chapter.id);
      });
    },
  },
  Query: {
    myChapterGroups: {
      authentication: true,
      resolve: async (root, args, { models, user }) => {
        return models.ChapterGroup.findAll({ where: { userId: user.id } });
      },
    },
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
    createChapter: {
      authentication: true,
      resolve: async (root, { type }, { models, user }) => {
        try {
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
    deleteChapter: {
      authentication: true,
      resolve: async (root, { type, id }, { models, user }) => {
        try {
          const chapterGroup = await models.ChapterGroup.findOne({
            where: { userId: user.id, type },
          });

          if (!chapterGroup) {
            throw new Error('Not found type');
          }

          const chapter = await models.Chapter.findOne({
            where: { id, chapterGroupId: chapterGroup.id },
          });

          if (!chapter) {
            throw new Error('Not found chapter');
          }

          return models.ChapterGroup.deleteChapter(chapterGroup, chapter);
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
    },
    reorderChapters: {
      authentication: true,
      resolve: async (root, { chapterGroupId, newOrder }, { models, user }) => {
        const chapterGroup = await models.ChapterGroup.findOne({
          where: { userId: user.id, id: chapterGroupId },
        });

        if (!chapterGroup) {
          throw new Error('Not found type');
        }

        return models.ChapterGroup.reorderChapters(chapterGroup, newOrder);
      },
    },
  },
};
