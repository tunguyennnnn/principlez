const MockImage = {
  thumb:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  medium:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  large:
    'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
};

export default {
  Chapter: {
    imageTheme: (chapter, args, { models }) => MockImage,
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
    updateChapterContent: async (
      root,
      { id, title, body },
      { models, user },
    ) => {
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
    uploadImageTheme: async (
      root,
      { storyId, chapterId, file },
      { models, user },
    ) => {
      try {
        const { stream, filename, mimetype, encoding } = await file;
        return MockImage;
      } catch (e) {
        return MockImage;
      }
    },
  },
};
