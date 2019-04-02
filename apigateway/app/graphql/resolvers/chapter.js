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
    imageTheme: (chapter, args, { models }) => MockImage,
    type: async (chapter, args, { models }) => {
      const chapterGroup = await chapter.getChapterGroup();
      return chapterGroup.type;
    },
    isAuthor: async (chapter, args, { models, user }) => {
      if (!user || chapter.userId !== user.id) {
        return false;
      }
      return true;
    },
    author: async (chapter, args, { models }) => {
      return models.User.findOne({ where: { id: chapter.userId } });
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
    chapterViewerInfo: async (root, { chapterId }, { models, user }) => {
      if (!user) {
        return { liked: false };
      }
      const liked = !!(await models.ChapterLike.findOne({
        where: { chapterId, userId: user.id },
      }));
      return { liked };
    },
    allChapters: async (root, { limit, cursor, userId }, { models }) => {
      try {
        let chapterList;
        if (userId) {
          chapterList = await models.Chapter.getByUserId(userId);
        } else {
          chapterList = await models.Chapter.get({ limit, cursor });
        }
        return {
          edges: chapterList.map(chapter => {
            return {
              cursor: chapter.updatedAt,
              node: chapter,
            };
          }),
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
  Mutation: {
    updateChapterContent: {
      authentication: true,
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
      authentication: true,
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
