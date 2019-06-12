export default `
  type LearnNote {
    id: ID!
    body: JSON!
  }

  type Mutation {
    updateLearnNote(id: ID!, body: JSON!): LearnNote!
  }
`;
