export default `

  type ChapterFace {
    id: ID!
    title: String!
  }

  type ChapterGroup {
    id: ID!
    type: String!
    chapterListOrder: [ID!]!
    chapters: [ChapterFace!]!
  }

  type createdChapterResult {
    chapterGroup: ChapterGroup!
    chapter: Chapter!
  }

  type Query {
    chapterGroups (userId: ID!): [ChapterGroup!]!
    myChapterGroups: [ChapterGroup!]!
  }

  type Mutation {
    createChapter (type: String!): createdChapterResult!
    deleteChapter (type: String!, id: ID!): ChapterGroup!
    reorderChapters (chapterGroupId: ID!, newOrder: [ID!]!): ChapterGroup!
  }
`;
