export default `
  type ItemToLearn {
    id: ID!
    name: String!
    description: String
    source: String!
    owner: User!
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
    newLearningItems(userId: ID, cursor: String, limit: Int = 10): ItemToLearnListConnection!
  }

  type Mutation {
    createItemToLearn(name: String!, description: String, source: String!, learningAreaId: ID): ItemToLearn!
  }
`;
