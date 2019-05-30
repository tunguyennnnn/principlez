export default `
  type ItemToLearn {
    name: String!
    description: String
    source: String!
    user: User!
  }

  type ItemToLearnList {
    cursor: String!
    nodes: [ItemToLearn!]!
  }

  type Query {
    newItems(userId: ID): ItemToLearnList
  }

  type Mutation {
    createItemToLearn(name: String!, description: String, source: String!, learningAreaId: ID): ItemToLearn!
  }
`;
