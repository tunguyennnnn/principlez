export default {
  Mutation: {
    likeChapter: {
      authentication: true,
      resolve: async (root, { chapterId }, { models, user }) => {
        const chapter = await models.Chapter.findOne({
          where: { id: chapterId },
        });
        if (!chapter) {
          throw new Error('Resource not found');
        }
        const liked = !!(await models.ChapterLike.addLike(chapterId, user.id));

        return {
          liked,
          count: await models.ChapterLike.count({
            where: { chapterId },
          }),
        };
      },
    },
    unlikeChapter: {
      authentication: true,
      resolve: async (root, { chapterId }, { models, user }) => {
        const chapter = await models.Chapter.findOne({
          where: { id: chapterId },
        });
        if (!chapter) {
          throw new Error('Resource not found');
        }
        await models.ChapterLike.removeLike(chapterId, user.id);
        return {
          liked: false,
          count: await models.ChapterLike.count({
            where: { chapterId },
          }),
        };
      },
    },
  },
};
