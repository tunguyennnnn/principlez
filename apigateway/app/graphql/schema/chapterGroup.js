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

  type Query {
    chapterGroups (userId: ID!): [ChapterGroup!]
    createChapter (type: String!, orderNumber: Int = 0): Chapter!
    removeChapter (type: String!, id: ID!): ID!
    reorderChapter (chapterGroupId: ID!, newOrder: [Int!]!): [Int!]!
  }
`;
