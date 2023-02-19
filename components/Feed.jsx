import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/components/Feed.module.scss";
import FeedPost from "@/components/FeedPost";
import pb from "@/lib/pocketbase";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

const Box = (props) => {
  const [type, setType] = useState("relevant");
  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState("-created");

  const relevantRef = useRef(null);
  const latestRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const fetchPosts = async () => {
    const pageNum = 1;
    const perPage = 5;

    const record = await pb.collection("posts").getList(pageNum, perPage, {
      expand: "poster",
      sort: filter,
    });

    return record;
  };

  const {
    data: record,
    isLoading,
    isError,
  } = useQuery(["feed", type, category], fetchPosts, {
    enabled: !!type && !!category,
  });

  useEffect(() => {
    if (type === "relevant") {
      relevantRef.current.classList.add(styles.selected);
      latestRef.current.classList.remove(styles.selected);
      topRef.current.classList.remove(styles.selected);
      setFilter("-likes");
    }
    if (type === "latest") {
      relevantRef.current.classList.remove(styles.selected);
      latestRef.current.classList.add(styles.selected);
      topRef.current.classList.remove(styles.selected);
      setFilter("-created");
    }
    if (type === "top") {
      relevantRef.current.classList.remove(styles.selected);
      latestRef.current.classList.remove(styles.selected);
      topRef.current.classList.add(styles.selected);
      setFilter("-likes");
    }
  }, [type, category]);

  const handleContentSelector = (e) => {
    if (e.target.tagName === "P") {
      setType(e.target.parentElement.id);
      return;
    }
    setType(e.target.id);
  };

  return (
    <div className={styles.container_box} key="feed">
      <div className={styles.content_selector}>
        <div
          ref={relevantRef}
          className={styles.content_selector_button}
          onClick={handleContentSelector}
          id="relevant"
        >
          <p>Relevant</p>
        </div>
        <div
          ref={latestRef}
          className={styles.content_selector_button}
          onClick={handleContentSelector}
          id="latest"
        >
          <p>Latest</p>
        </div>
        <div
          ref={topRef}
          className={styles.content_selector_button}
          onClick={handleContentSelector}
          id="top"
        >
          <p>Top</p>
        </div>
      </div>

      {record && !isLoading && !isError ? (
        record.items.map((post, index) => (
          <FeedPost
            image={post.cover_image}
            userAvatar={post.expand?.poster?.avatar}
            user={post.expand?.poster?.username}
            date={post.created}
            title={post.title}
            description={post.summary}
            slug={post.slug}
            key={"post " + index}
            tags={post.tags}
            record={post}
          />
        ))
      ) : (
        <div className={styles.no_posts}>
          <p>No {category} yet...</p>
        </div>
      )}
    </div>
  );
};

export default Box;
