"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n\n  type LearningArea {\n    id: ID!\n    name: String!\n    description: String\n    settings: JSON!\n    owner: User!\n    items: ItemToLearnListConnection!\n  }\n\n  type Query {\n    learningAreas (userId: ID): [LearningArea!]!\n  }\n\n  type Mutation {\n    createLearningArea (name: String!, description: String): LearningArea!\n    deleteLearningArea (id: ID): DeleteResult!\n  }\n";
exports.default = _default;