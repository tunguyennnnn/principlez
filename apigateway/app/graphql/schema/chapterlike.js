export default `
  type ChapterLiker {
    id: ID!
    likedAt: String!
    user: User!
  }

  type ChapterLikerEdge {
    cursor: String!
    node: ChapterLiker!
  }

  type ChapterLike {
    count: Int!
    edges: [ChapterLikerEdge!]!
  }

  type Mutation {
    likeChapter (chapterId: ID!): Boolean!
    unlikeChapter (chapterId: ID!): Boolean!
  }
`;
