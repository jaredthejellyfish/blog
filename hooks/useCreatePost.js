import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import slugify from "react-slugify";

export default function useCreatePost() {
  const router = useRouter();
  const { isAuth, user } = useAuth();

  async function post({ content, title, summary, category, tags }) {
    if (!isAuth) return;

    const data = {
      poster: user.id,
      content: content,
      title: title,
      summary: summary,
      category: category,
      tags: tags,
      slug: slugify(title),
    };

    console.log(data)

    try {
      const foundRecord = await pb
        .collection("posts")
        .getFirstListItem(`slug="${data.slug}"`);

      if (foundRecord) {
        toast.error("A post with that title already exists.", {
          position: "top-right",
        });
        return;
      }
    } catch {
      const record = await pb.collection("posts").create(data);

      if (record?.poster == user.id) {
        router.prefetch(`/posts/${record.slug}`);
        toast.success(`Your post was uploaded! 🎉`);
        router.push(`/posts/${record.slug}`);
      } else {
        toast.error("There was an error creating your post.", {
          position: "top-right",
        });
      }
    }
  }
  return useMutation((payload) => post(payload), {
    onError: (error) => {
      console.log(error);
    },
  });
}
