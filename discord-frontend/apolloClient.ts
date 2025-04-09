import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; {$name}=`)
    if(value.length === 2) return parts.pop()?.split(';').shift();
}

const authLink = setContext(
    async (_, { headers }) => {
        const token = getCookie("__session");
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    }
)