import { gql } from "@apollo/client";

export const NEW_EVENT_MUTATİON = gql`
  mutation addEvent($data: CreatedEventInput!) {
    createdEvent(data: $data) {
      id
      title
      desc
      date
      from
      to
      location_id
      user_id
    }
  }
`;