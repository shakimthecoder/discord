import { Outlet } from "react-router-dom";
import Sidebar from '../components/navigation/Sidebar';
import { useProfileStore } from "../../stores/profilestore";
import { useSession } from "@clerk/clerk-react";
import { useMutation } from "@apollo/client";
import { CreateProfileMutation, CreateProfileMutationVariables } from "../gql/graphql";
import { CREATE_PROFILE } from "../graphql/mutations/createProfile";
import { useEffect } from "react";

function RouteLayout() {
  const profile = useProfileStore((state) => state.profile);
  const session = useSession();

  const [createProfile] = useMutation<
    CreateProfileMutation, CreateProfileMutationVariables
    >(CREATE_PROFILE, {});

    useEffect(() => {
      createProfileFn = async () => {

      }
      []
    })

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RouteLayout