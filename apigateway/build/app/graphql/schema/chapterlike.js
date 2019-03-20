"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  type ChapterLiker {\n    id: ID!\n    likedAt: String!\n    user: User!\n  }\n\n  type ChapterLikerEdge {\n    cursor: String!\n    node: ChapterLiker!\n  }\n\n  type ChapterLike {\n    count: Int!\n    edges: [ChapterLikerEdge!]!\n  }\n\n  type Mutation {\n    likeChapter (chapterId: ID!): Boolean!\n    unlikeChapter (chapterId: ID!): Boolean!\n  }\n";
exports.default = _default;