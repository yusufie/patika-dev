import { gql } from '@apollo/client';

export const QUESTION_DETAIL_SUBSCRIPTION = gql`
    subscription questionDetail($id: INT!) {
        questions_by_pk(id: $id) {
            id
            title
            options {
                id
                title
                votes_aggregate {
                    aggregate {
                        count
                    }
                }
            }
        }
    }
`;

export const NEW_VOTE_MUTATION = gql`
    mutation newVote($input: votes_insert_input!) {
        insert_votes_one(object: $input) {
            option {
                title
            }
        }
    }
`;