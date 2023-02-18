import React from "react";
import { useRouter } from "next/router";
import useUsernameProfile from "@/hooks/useUsernameProfile";
import styles from "@/styles/pages/Profile.module.scss";
import Avatar from "react-avatar";

const Profile = () => {
  const router = useRouter();
  const { user: userParam } = router.query;

  const { profile, isLoading, isError } = useUsernameProfile({ username: userParam });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_section}>{JSON.stringify(profile)}</div>
      <Avatar name={profile.username} size="100" round={true} src={profile.avatar} />
    </div>
  );
};

export default Profile;
