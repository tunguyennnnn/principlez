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
    liked: Boolean
    edges: [ChapterLikerEdge!]!
  }

  type Mutation {
    likeChapter (chapterId: ID!): ChapterLike!
    unlikeChapter (chapterId: ID!): ChapterLike!
  }
`;
