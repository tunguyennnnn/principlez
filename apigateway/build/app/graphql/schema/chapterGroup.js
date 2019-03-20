"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n\n  type ChapterFace {\n    id: ID!\n    title: String!\n    view: ChapterView!\n    like: ChapterLike!\n  }\n\n  type ChapterGroup {\n    id: ID!\n    type: String!\n    chapterListOrder: [ID!]!\n    chapters: [ChapterFace!]!\n  }\n\n  type createdChapterResult {\n    chapterGroup: ChapterGroup!\n    chapter: Chapter!\n  }\n\n  type Query {\n    chapterGroups (userId: ID!): [ChapterGroup!]!\n    myChapterGroups: [ChapterGroup!]!\n  }\n\n  type Mutation {\n    createChapter (type: String!): createdChapterResult!\n    deleteChapter (type: String!, id: ID!): ChapterGroup!\n    reorderChapters (chapterGroupId: ID!, newOrder: [ID!]!): ChapterGroup!\n  }\n";
exports.default = _default;