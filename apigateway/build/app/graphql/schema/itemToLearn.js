"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  type ItemToLearn {\n    id: ID!\n    name: String!\n    description: String\n    source: String!\n    isAuthor: Boolean!\n    owner: User!\n    learnNote: LearnNote!\n  }\n\n  type ItemToLearnEdge {\n    cursor: String!\n    node: ItemToLearn!\n  }\n\n  type ItemToLearnListConnection {\n    pageInfo: PageInfo!\n    edges: [ItemToLearnEdge!]!\n  }\n\n  type Query {\n    newLearningItems(userId: ID, learningAreaId: ID, cursor: String, limit: Int = 10): ItemToLearnListConnection!\n    itemToLearn(id: ID!): ItemToLearn!\n  }\n\n  type Mutation {\n    createItemToLearn(name: String!, description: String, source: String, learningAreaId: ID): ItemToLearn!\n    deleteItemToLearn(id: ID!): DeleteResult!\n    updateLearnNote(id: ID!, body: JSON): LearnNote!\n  }\n";
exports.default = _default;