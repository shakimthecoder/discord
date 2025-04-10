import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
   mutation CreateProfile($input: CreateProfileDto!, file: Upload!) {
    createServer(input: $input, file: $file) {
        id
        name 
        imageUrl
        members {
            id
        }
    }
}
`;