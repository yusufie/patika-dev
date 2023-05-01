import { gql } from "@apollo/client";

const eventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
    from
    to
  }
`;

export const GET_EVENTS = gql`
  query getEvents {
    events {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const EVENTS_SUBSCRİPTİON = gql`
  subscription {
    eventCreated {
      ...EventFragment
    }
  }
  ${eventFragment}
`;