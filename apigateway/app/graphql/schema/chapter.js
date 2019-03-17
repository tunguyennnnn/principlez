export default `
  type ImageTheme {
    thumb: String!
    medium: String!
    large: String!
  }

  type Chapter {
    id: ID!
    imageTheme: ImageTheme
    type: String!
    title: String!
    body: JSON!
    isAuthor: Boolean!
  }

  type ChapterViewerInfo {
    liked: Boolean!
  }

  type Query {
    chapter (chapterId: ID!): Chapter!
    chapterViewerInfo (chapterId: ID): ChapterViewerInfo! 
  }

  type Mutation {
    uploadImageTheme(storyId: ID!, chapterId: ID, file: Upload!): ImageTheme!
    updateChapterContent(id: ID!, title: String, body: JSON): Chapter!
  }
`;
