import gql from 'graphql-tag';

export const newItemsQuery = gql`
  query newLearningItems($learningAreaId: ID, $cursor: String, $limit: Int) {
    newItems: newLearningItems(
      learningAreaId: $learningAreaId
      cursor: $cursor
      limit: $limit
    ) {
      pageInfo {
        total
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title: name
          description
          source
        }
      }
    }
  }
`;

export const learningAreas = gql`
  query learningAreas {
    learningAreas {
      id
      title: name
      description
    }
  }
`;

export const createItemToLearnMutation = gql`
  mutation createItemToLearn(
    $name: String!
    $description: String
    $source: String
    $learningAreaId: ID
  ) {
    createItemToLearn(
      name: $name
      description: $description
      source: $source
      learningAreaId: $learningAreaId
    ) {
      id
      title: name
      description
      source
    }
  }
`;

export const createLearningAreaMutation = gql`
  mutation createLearningArea($name: String!, $description: String) {
    createLearningArea(name: $name, description: $description) {
      id
      title: name
      description
    }
  }
`;

export const deleteLearningAreaMutation = gql`
  mutation deleteLearningArea($id: ID!) {
    deleteLearningArea(id: $id) {
      error
    }
  }
`;
