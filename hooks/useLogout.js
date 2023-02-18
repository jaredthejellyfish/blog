import pb from "@/lib/pocketbase";
import { useState } from "react";

export default function useLogout() {
  const [logoutStatus, setLogoutStatus] = useState(0);

  function logout() {
    pb.authStore.clear();
    setLogoutStatus(Math.random())

  };

  return logout ;
}
