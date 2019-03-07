export default `
  type ImageTheme {
    thumb: String!
    medium: String!
    large: String!
  }

  type Chapter {
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
  }
`;