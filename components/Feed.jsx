import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/components/Feed.module.scss";
import FeedPost from "@/components/FeedPost";
import posts from "@/samples/sample_feeds";

const Box = (props) => {
  const [type, setType] = useState("relevant");
  const [category, setCategory] = useState(null);

  const relevantRef = useRef(null);
  const latestRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  useEffect(() => {
    if (type === "relevant") {
      relevantRef.current.classList.add(styles.selected);
      latestRef.current.classList.remove(styles.selected);
      topRef.current.classList.remove(styles.selected);
    }
    if (type === "latest") {
      relevantRef.current.classList.remove(styles.selected);
      latestRef.current.classList.add(styles.selected);
      topRef.current.classList.remove(styles.selected);
    }
    if (type === "top") {
      relevantRef.current.classList.remove(styles.selected);
      latestRef.current.classList.remove(styles.selected);
      topRef.current.classList.add(styles.selected);
    }
  }, [type]);

  const handleContentSelector = (e) => {
    if (e.target.tagName === "P") {
      setType(e.target.parentElement.id);
      return;
    }
    setType(e.target.id);
  };

  return (
    <div className={styles.container_box}>
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

      {posts[category] ? (
        posts[category].map((post, index) => (
          <FeedPost
            image={post.image}
            user={post.user}
            date={post.date}
            title={post.title}
            description={post.description}
            key={index}
            tags={post.tags}
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
