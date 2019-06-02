export default `
  scalar JSON
  scalar Upload
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type PageInfo {
    total: Int!
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type DeleteResult {
    error: String
  }
`;
