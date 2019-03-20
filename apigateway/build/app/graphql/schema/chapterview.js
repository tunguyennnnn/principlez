"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n\n  type ChapterViewer {\n    id: ID!\n    viewedAt: String!\n    viewer: User!\n  }\n\n  type ChapterViewerEdge {\n    cursor: String!\n    node: ChapterViewer!\n  }\n\n  type ChapterView {\n    count: Int!\n    anonymousCount: Int!\n    edges: [ChapterViewerEdge!]!\n  }\n\n  type Mutation {\n    viewChapter (userId: ID, chapterId: ID!): Boolean!\n  }\n";
exports.default = _default;