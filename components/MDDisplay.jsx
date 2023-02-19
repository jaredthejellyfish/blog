import React from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import MarkdownIt from "markdown-it";
import styles from "@/styles/markdown.module.scss";

import parse from "html-react-parser";

const MDDisplay = (props) => {
  let md = new MarkdownIt({ html: true, linkify: true, typographer: true });

  if (typeof props.content !== "string") return <div>Loading...</div>;

  let result = md.render(props.content);
  return <div className={styles["markdown-body"]}>{parse(result)}</div>;
};

export default MDDisplay;
