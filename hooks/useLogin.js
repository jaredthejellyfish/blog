import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function useLogin() {

  const router = useRouter();

  async function login({ email, password }) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    if (pb.authStore.isValid) {
      router.push("/");
      toast(`Nice to see you ${pb.authStore?.model?.username}!‎ ‎ 🎉`);
    } else {
      toast.error("There was an error logging in.");
    }

    return authData;
  }

  return useMutation(login);
}
