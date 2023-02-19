import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/Post.module.scss";
import MDDisplay from "@/components/MDDisplay";
import isImage from "@/lib/isImage";
import Tag from "@/components/Tag";
import pb from "@/lib/pocketbase";

const Post = () => {
  const router = useRouter();
  const { slug: userParam } = router.query;

  const fetchPost = async () => {
    console.log("fetching post");
    const record = await pb
      .collection("posts")
      .getFirstListItem(`slug="${userParam}"`, { expand: "poster" });
    return record;
  };

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(["post"], fetchPost, {
    enabled: !!userParam,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className={styles.wrapper} key="post-page">
      {isImage(pb.getFileUrl(post, post.cover_image)) && (
        <div className={styles.cover_image}>
          <Image
            src={pb.getFileUrl(post, post.cover_image)}
            alt="cover_image"
            width={850}
            height={420}
          />
        </div>
      )}

      <div className={styles.poster_section}>
        <Link href={`/profile/${post.expand?.poster?.username}`}>
          <Image
            className={styles.poster_avatar}
            src={
              post.expand?.poster &&
              isImage(
                pb.getFileUrl(post.expand.poster, post.expand?.poster?.avatar)
              )
                ? pb.getFileUrl(post.expand.poster, post.expand?.poster?.avatar)
                : "/images/avatar.png"
            }
            alt="avatar"
            width={40}
            height={40}
          />
          <div className={styles.poster_info}>
            <div className={styles.poster_name}>
              {post.expand?.poster?.username}
            </div>
            <div className={styles.poster_date}>{post.created}</div>
          </div>
        </Link>
      </div>
      <div className={styles.title}>{post.title}</div>

      {post.tags?.tags?.length > 0 && (
        <div className={styles.tags_section}>
          {post.tags?.tags?.map((tag, index) => (
            <Tag
              key={index}
              id={index}
              color={tag.color}
              content={tag.content}
              link={tag.link}
            />
          ))}
        </div>
      )}
      <MDDisplay content={post.content} />
    </div>
  );
};

export default Post;
