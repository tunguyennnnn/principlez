export default `

  type ChapterView {
    id: ID!
    title: String!
  }

  type ChapterGroup {
    id: ID!
    type: String!
    chapterListOrder: [ID!]!
    chapters: [ChapterView!]!
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
    reorderChapter (chapterGroupId: ID!, newOrder: [Int!]!): [Int!]!
  }
`;