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

export default {
  Query: {
    chapter: async (root, { storyId, chapterId }, { models, user }) => {
      try {
        return chapterId ? MockChapter : MockAboutMeChapter;
      } catch (e) {
        throw e;
      }
    },
  },
};
