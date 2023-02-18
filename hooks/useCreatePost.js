import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import slugify from 'react-slugify';

export default function useCreatePost() {
  const router = useRouter();
  const { isAuth, user, isLoading } = useAuth();

  async function post({ text, title, summary, category, tags }) {
    if (!isAuth) return;

    const data = {
      owner: user.id,
      text: text,
      title: title,
      summary: summary,
      category: category,
      tags: tags,
      slug: slugify(title),
    };

    const record = await pb.collection("posts").create(data);

    if (record?.owner == user.id) {
      router.push("/");
      toast.success(`Your post was uploaded! 🎉`);
    } else {
      toast.error("There was an error creating your post.", {
        position: "top-right",
      });
    }
  }
  return useMutation(post);
}
