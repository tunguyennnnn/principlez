"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  interface SearchResultInterface {\n    id: ID!\n  }\n\n  union SearchResult = StorySearchResult | UserSearchResult\n\n  type StorySearchResult implements SearchResultInterface {\n    id: ID!\n    title: String!\n    body: JSON!\n  }\n\n  type UserSearchResult implements SearchResultInterface {\n    id: ID!\n    fullname: String!\n  }\n\n  type TagSearchResult implements SearchResultInterface {\n    id: ID!\n    name: String!\n  }\n  \n  type Query {\n    search(text: String!): [SearchResult!]!\n  }\n";
exports.default = _default;