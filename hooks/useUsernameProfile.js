import pb from "@/lib/pocketbase";
import { useState, useEffect } from "react";

const InitialState = {
  avatarURL: "",
  bio: "",
  created: "",
  email: "",
  id: "",
  username: "",
  verified: null,
};

export default function useUsernameProfile(user) {
  const [profile, setProfile] = useState(InitialState);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchByUser = async () => {
      const record = await pb
        .collection("users")
        .getFirstListItem(`username="${"jaredthejelly"}"`);
      return record;
    };
    fetchByUser()
      .then((record) => {
        setProfile({
          avatarURL: record.avatar
            ? `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${record.avatar}`
            : null,
          bio: record.bio,
          created: record.created,
          email: record.email,
          id: record.id,
          username: record.username,
          verified: record.verified,
        });
        setIsLoading(false);
        setError(false);
      })
      .catch((e) => {
        setError(true);
        setIsLoading(false);
      });
  }, [user.username]);

  return { profile, isLoading, isError };
}
