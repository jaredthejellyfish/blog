import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function useRegister() {
  const router = useRouter();

  async function register({ username, email, password, passwordConfirm }) {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    await pb.collection("users").create(data);

    await pb.collection("users").authWithPassword(email, password);


    if (pb.authStore.isValid) {
      router.push("/");
      toast.success(`Nice to meet you ${pb.authStore?.model?.username}! 🎉`);
    }
  }
  return useMutation(register);
}
