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
    author: User!
    view: ChapterView!
    like: ChapterLike!
  }

  type ChapterViewerInfo {
    liked: Boolean!
  }

  type ChappterEdge {
    cursor: String!
    node: Chapter!
  }

  type ChapterList {
    pageInfo: PageInfo!
    count: Int!
    edges: [ChappterEdge!]!
  }

  type Query {
    chapter (chapterId: ID!): Chapter!
    chapterViewerInfo (chapterId: ID): ChapterViewerInfo! 
    allChapters (limit: Int = 20, cursor: String): ChapterList!
  }

  type Mutation {
    uploadImageTheme(storyId: ID!, chapterId: ID, file: Upload!): ImageTheme!
    updateChapterContent(id: ID!, title: String, body: JSON): Chapter!
  }
`;
