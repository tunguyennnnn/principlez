const MockAboutMeChapter = {
  type: 'ABOUT_ME',
  title: 'About Me',
  body: {},
};

const MockChapter = {
  type: 'CHAPTER',
  title: 'Chapter',
  body: {},
};

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
    chapter: async (root, { storyId, chapterId }, { models, user }) => {
      try {
        return chapterId ? MockChapter : MockAboutMeChapter;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
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
