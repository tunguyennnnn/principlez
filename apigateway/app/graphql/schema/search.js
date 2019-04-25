export default `
  interface SearchResultInterface {
    id: ID!
  }

  union SearchResult = StorySearchResult | UserSearchResult

  type StorySearchResult implements SearchResultInterface {
    id: ID!
    title: String!
    body: JSON!
  }

  type UserSearchResult implements SearchResultInterface {
    id: ID!
    fullname: String!
  }

  type TagSearchResult implements SearchResultInterface {
    id: ID!
    name: String!
  }
  
  type Query {
    search(text: String!): [SearchResult!]!
  }
`;
