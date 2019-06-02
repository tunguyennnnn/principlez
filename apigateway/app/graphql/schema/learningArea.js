export default `

  type LearningArea {
    id: ID!
    name: String!
    description: String
    settings: JSON!
    owner: User!
    items: ItemToLearnListConnection!
  }

  type Query {
    learningAreas (userId: ID): [LearningArea!]!
  }

  type Mutation {
    createLearningArea (name: String!, description: String): LearningArea!
    deleteLearningArea (id: ID): DeleteResult!
  }
`;
