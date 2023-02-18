import React from "react";
import styles from "@/styles/components/FeedPost.module.scss";
import Image from "next/image";
import cover from "@/public/cover.webp";
import cover_2 from "@/public/cover_2.jpeg";
import profile from "@/public/pfp.webp";
import Tag from "@/components/Tag";

const HomePost = (props) => {
  let cover_image = cover;
  const {tags} = props;

  if (
    props.title === "Creating a Delicious Lemon Cake Recipe from Scratch 🍋🍰"
  ) {
    cover_image = cover_2;
  }

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
        <Image priority src={cover_image} className={styles.image} alt="" />
      ) : null}

      <div className={styles.content}>
        <div className={styles.profile_section}>
          <Image src={profile} className={styles.profile} alt="" />
          <div className={styles.profile_info}>
            <h3 className={styles.name}>{props.user}</h3>
            <p className={styles.date}>{props.date}</p>
          </div>
        </div>
        <div className={styles.post_section}>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.tags_section}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              id={index}
              color={tag.color}
              content={tag.content}
              link={tag.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePost;
