export default `

  type LearningArea {
    id: ID!
    name: String!
    description: String
    settings: JSON!
    user: User!
    items: ItemToLearnListConnection!
  }

  type Query {
    learningAreas (userId: ID): [LearningArea!]!
  }

  type Mutation {
    createLearningArea (name: String!, description: String): LearningArea!
  }
`;
