export default `
  scalar JSON
  scalar Upload
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

`;
