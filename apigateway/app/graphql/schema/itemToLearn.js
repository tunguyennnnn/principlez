export default `
  type ItemToLearn {
    id: ID!
    name: String!
    description: String
    source: String!
    isAuthor: Boolean!
    owner: User!
    learnNote: LearnNote!
  }

  type ItemToLearnEdge {
    cursor: String!
    node: ItemToLearn!
  }

  type ItemToLearnListConnection {
    pageInfo: PageInfo!
    edges: [ItemToLearnEdge!]!
  }

  type Query {
    newLearningItems(userId: ID, learningAreaId: ID, cursor: String, limit: Int = 10): ItemToLearnListConnection!
    itemToLearn(id: ID!): ItemToLearn!
  }

  type Mutation {
    createItemToLearn(name: String!, description: String, source: String, learningAreaId: ID): ItemToLearn!
    deleteItemToLearn(id: ID!): DeleteResult!
    updateLearnNote(id: ID!, body: JSON): LearnNote!
  }
`;
