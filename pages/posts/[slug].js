import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pb from "@/lib/pocketbase";

const Post = () => {
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  const router = useRouter();
  const { slug: userParam } = router.query;

  useEffect(() => {
    if (userParam) {
      const fetchPost = async () => {
        const record = await pb
          .collection("posts")
          .getFirstListItem(`slug="${userParam}"`, { expand: "poster" });
        return record;
      };
      fetchPost()
        .then((record) => {
          setPost(record);
        })
        .catch((e) => {
          setError(true);
        });
      setLoading(false);
    }
  }, [userParam]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <span>{post.content}</span>
      <p>{post.summary}</p>
      <p>{post.category}</p>
      <p>{JSON.stringify(post.tags)}</p>
      <p>{post.slug}</p>
      <p>{post.expand?.poster?.username}</p>
      <p>{post.expand?.poster?.avatar}</p>
    </div>
  );
};

export default Post;
