"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n    type ProfileImage {\n        id: Int!\n        thumb: String!\n        medium: String!\n        large: String!\n    }\n    \n    type Location {\n        id: Int!\n        country: String!\n        city: String!\n    }\n\n    type AuthenticationToken {\n        token: String!\n        expiresIn: Int!\n    }\n\n    type User {\n        id: Int!\n        email: String!\n        fullname: String!\n        location: Location!\n        yearOfBirth: String!\n        profileImage: ProfileImage!\n        authToken: AuthenticationToken!\n    }\n\n    input LocationInput {\n        country: String!\n        city: String!\n    }\n\n    type Query {\n        user(id: ID!): User!\n        me: User!\n    }\n\n    type UserPayload {\n        error: String\n        user: User\n    }\n\n    type Mutation {\n        signup(email: String!, password: String!, fullname: String!, yearOfBirth: String!, location: LocationInput!): UserPayload!\n        login(email: String!, password: String!): UserPayload!\n    }\n";
exports.default = _default;