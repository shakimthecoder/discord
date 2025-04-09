import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile } from "./../src/gql/graphql";

interface ProfileStore {
    profile: Profile | null
    setProfile: (profile: Profile | null) => void,
}