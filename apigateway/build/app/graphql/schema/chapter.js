"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  type ImageTheme {\n    thumb: String!\n    medium: String!\n    large: String!\n  }\n\n  type Chapter {\n    id: ID!\n    imageTheme: ImageTheme\n    type: String!\n    title: String!\n    body: JSON!\n    isAuthor: Boolean!\n  }\n\n  type ChapterViewerInfo {\n    liked: Boolean!\n  }\n\n  type Query {\n    chapter (chapterId: ID!): Chapter!\n    chapterViewerInfo (chapterId: ID): ChapterViewerInfo! \n  }\n\n  type Mutation {\n    uploadImageTheme(storyId: ID!, chapterId: ID, file: Upload!): ImageTheme!\n    updateChapterContent(id: ID!, title: String, body: JSON): Chapter!\n  }\n";
exports.default = _default;