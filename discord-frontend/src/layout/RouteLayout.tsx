import { Outlet } from "react-router-dom";
import Sidebar from '../components/navigation/Sidebar';
import { useProfileStore } from "../../stores/profilestore";
import { useSession, useAuth } from "@clerk/clerk-react";
import { useMutation } from "@apollo/client";
import { CreateProfileMutation, CreateProfileMutationVariables } from "../gql/graphql";
import { CREATE_PROFILE } from "../graphql/mutations/createProfile";
import { useEffect } from "react";


function RouteLayout() {
  const profile = useProfileStore((state) => state.profile)

  const { session } = useSession();
  const { isSignedIn } = useAuth();

  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {})
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    if (!isSignedIn) setProfile(null)
  }, [isSignedIn, setProfile]);

  useEffect(() => {
    const createProfileFn = async () => {
      if (!session?.user) return
      try {
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user.username || "",
              imageUrl: session?.user.imageUrl,
            },
          },
          onCompleted: (data) => {
            setProfile(data.createProfile);
          },
          refetchQueries: ["GetServers"],
        })
      } catch (err) {
        console.log("Error creating profile in backend: ", err)
      }
    }
    if (profile?.id) return
    createProfileFn()
  }, [session?.user, profile?.id])

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RouteLayout