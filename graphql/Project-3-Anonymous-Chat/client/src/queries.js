import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      message
      user
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($data: createMessage!) {
    createMessage(data: $data) {
      id
      message
      user
    }
  }
`;

export const MESSAGE_SUBS = gql`
  subscription {
    messageCreated {
      id
      message
      user
    }
  }
`;