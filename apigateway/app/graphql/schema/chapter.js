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
  }

  type Query {
    chapter (storyId: ID!, chapterId: ID): Chapter!
  }

  type Mutation {
    uploadImageTheme(storyId: ID!, chapterId: ID, file: Upload!): ImageTheme!
    createChapter (type: String!, orderNumber: Int = 0): Chapter!
    removeChapter (type: String!, id: ID!): ID!
    reorderChapter (chapterGroupId: ID!, newOrder: [Int!]!): [Int!]!
  }
`;
