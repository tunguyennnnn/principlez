export default `
    type ProfileImage {
        id: Int!
        thumb: String!
        medium: String!
        large: String!
    }
    
    type Location {
        id: Int!
        country: String!
        city: String!
    }

    type AuthenticationToken {
        token: String!
        expiresIn: Int!
    }

    type User {
        id: Int!
        email: String!
        fullname: String!
        location: Location!
        yearOfBirth: String!
        profileImage: ProfileImage!
        authToken: AuthenticationToken!
    }

    input LocationInput {
        country: String!
        city: String!
    }

    type Query {
        user(id: ID!): User!
        me: User!
    }

    type UserPayload {
        error: String
        user: User
    }

    type Mutation {
        signup(email: String!, password: String!, fullname: String!, yearOfBirth: String!, location: LocationInput!): UserPayload!
        login(email: String!, password: String!): UserPayload!
    }
`;
