export default `

  type LearningArea {
    name: String!
    description: String
    settings: JSON!
    user: User!
    items: ItemToLearnList
  }

  type Query {
    learningAreas (userId: ID): [LearningArea!]!
  }

  type Mutation {
    createLearningArea (name: String!, description: String): LearningArea!
  }
`;
