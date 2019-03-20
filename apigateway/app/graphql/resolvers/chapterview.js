export default {
  Mutation: {
    viewChapter: {
      resolve: async (root, { chapterId }, { models, user }) => {
        const chapter = await models.Chapter.findOne({
          where: { id: chapterId },
        });
        if (!chapter) {
          throw new Error(`Not found resource`);
        }
        if (!user) {
          await models.ChapterView.addAnonymousView(chapterId);
          return true;
        }

        if (chapter.userId === user.id) {
          return true;
        }

        await models.ChapterView.addViewer(chapterId, user.id);
        return true;
      },
    },
  },
};
