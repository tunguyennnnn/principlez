import gql from 'graphql-tag';

export const itemToLearnQuery = gql`
  query itemToLearn($id: ID!) {
    itemToLearn(id: $id) {
      id
      name
      description
      source
      isAuthor
      learnNote {
        id
        body
      }
    }
  }
`;

export const updateLearnNoteMutation = gql`
  mutation updateLearnNote($id: ID!, $body: JSON!) {
    updateLearnNote(id: $id, body: $body) {
      id
      body
    }
  }
`;
