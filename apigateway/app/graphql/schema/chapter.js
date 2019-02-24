export default `
  type Chapter {
    type: String!
    title: String!
    body: JSON!
  }

  type Query {
    chapter (storyId: ID!, chapterId: ID): Chapter!
  }
`;
