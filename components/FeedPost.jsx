import React from "react";
import styles from "@/styles/components/FeedPost.module.scss";
import Image from "next/image";
import profile from "@/public/pfp.webp";
import Tag from "@/components/Tag";
import pb from "@/lib/pocketbase";
import Link from "next/link";
import isImage from "@/lib/isImage";

const HomePost = (props) => {
  const { tags } = props;

  const imageUrl = pb.getFileUrl(props.record, props.image);
  const avatarUrl = pb.getFileUrl(props.record.expand.poster, props.record.expand.poster.avatar);

  return (
    <div
      className={styles.wrapper}
      style={
        !props.image
          ? { paddingTop: 10, paddingBottom: 20 }
          : { paddingBottom: 20 }
      }
    >
      {props.image ? (
        <Image
          priority
          src={imageUrl}
          width={650}
          height={200}
          className={styles.image}
          alt=""
        />
      ) : null}

      <div className={styles.content}>
        <div className={styles.profile_section}>
          {isImage(avatarUrl) ? (
            <Image
              src={avatarUrl}
              width={36}
              height={36}
              className={styles.profile}
              alt=""
            />
          ) : (
            <Image
              src={profile}
              width={36}
              height={36}
              className={styles.profile}
              alt=""
            />
          )}

          <div className={styles.profile_info}>
            <h3 className={styles.name}>{props.user}</h3>
            <p className={styles.date}>{props.date}</p>
          </div>
        </div>
        <div className={styles.post_section}>
          <Link href={`/posts/${props.slug}`} className={styles.title}>
            <h2>{props.title}</h2>
          </Link>
          <p className={styles.description}>{props.description}</p>
        </div>
        {tags && tags.tags ? (
          <div className={styles.tags_section}>
            {tags.tags.map((tag, index) => (
              <Tag
                key={index}
                id={index}
                color={tag.color}
                content={tag.content}
                link={tag.link}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePost;
