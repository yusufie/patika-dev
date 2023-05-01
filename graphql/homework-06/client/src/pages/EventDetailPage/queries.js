import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      user {
        username
      }
      location {
        lat
        lng
      }
      participants {
        user {
          username
        }
      }
    }
  }
`;

export const PARTİCİPANT_SUBSCRİPTİON = gql`
  subscription participantCreated($event_id: ID) {
    participantAdded(event_id: $event_id) {
      user {
        username
      }
    }
  }
`;