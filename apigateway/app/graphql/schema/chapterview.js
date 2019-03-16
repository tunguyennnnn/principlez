export default `

  type ChapterViewer {
    id: ID!
    viewedAt: String!
    viewer: User!
  }

  type ChapterViewerEdge {
    cursor: String!
    node: ChapterViewer!
  }

  type ChapterView {
    count: Int!
    anonymousCount: Int!
    edges: [ChapterViewerEdge!]!
  }

  type Mutation {
    viewChapter (userId: ID, chapterId: ID!): Boolean!
  }
`;
