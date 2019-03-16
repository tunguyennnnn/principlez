const MockImage = {
  thumb:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  medium:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  large:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
};

export default {
  ChapterFace: {
    view: async (chapter, args, { models }) => {
      const anonymousView = await models.AnonymousView.findOne({
        where: { chapterId: chapter.id },
      });

      return {
        anonymousCount: anonymousView ? anonymousView.count : 0,
        count: await models.ChapterView.count({
          where: { chapterId: chapter.id },
        }),
      };
    },
    like: async (chapter, args, { models }) => {
      return {
        count: await models.ChapterLike.count({
          where: { chapterId: chapter.id },
        }),
      };
    },
  },
  Chapter: {
    imageTheme: (chapter, args, { models }) => MockImage,
    type: async (chapter, args, { models }) => {
      const chapterGroup = await chapter.getChapterGroup();
      return chapterGroup.type;
    },
  },
  Query: {
    chapter: async (root, { chapterId }, { models, user }) => {
      try {
        return models.Chapter.findOne({ where: { id: chapterId } });
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    updateChapterContent: {
      resolve: async (root, { id, title, body }, { models, user }) => {
        if (!user) {
          throw new Error('Anauthenticated');
        }
        const chapter = await models.Chapter.findOne({
          where: { id, userId: user.id },
        });
        if (!chapter) {
          throw new Error('Chatper not found');
        }

        return chapter.update({
          title: title || chapter.title,
          body: body || chapter.body,
        });
      },
    },
    uploadImageTheme: {
      resolve: async (root, { storyId, chapterId, file }, { models, user }) => {
        try {
          const { stream, filename, mimetype, encoding } = await file;
          return MockImage;
        } catch (e) {
          return MockImage;
        }
      },
    },
  },
};
