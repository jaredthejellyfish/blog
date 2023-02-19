import React, { useState } from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import styles from "@/styles/pages/CreatePost.module.scss";
import useCreatePost from "@/hooks/useCreatePost";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import MDDisplay from "@/components/MDDisplay";

const plugins = [
  "header",
  "font-bold",
  "font-italic",
  "font-underline",
  "font-strikethrough",
  "list-unordered",
  "list-ordered",
  "block-quote",
  "block-wrap",
  "block-code-inline",
  "block-code-block",
  "table",
  "image",
  "link",
  "clear",
  "logger",
  "mode-toggle",
  "full-screen",
  "tab-insert",
];

const v1 = {
  menu: true,
  md: true,
  html: true,
  fullScreen: true,
  hideMenu: true,
};

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { mutate: post, isLoading } = useCreatePost();

  const onSubmit = () => {
    post({
      title: title,
      content: content,
      summary: "small hi",
      category: "stonks",
      tags: {},
    });
  };

  function handleEditorChange({ text }) {
    setContent(text);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <input
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <Editor
        className={styles.editor}
        plugins={plugins}
        markdownClass={styles.markdown}
        placeholder="Write your post here..."
        view={{ html: false }}
        renderHTML={(text) => (
          <MDDisplay content={text} />
        )}
        onChange={handleEditorChange}
      />
      <div className={styles.submit_section}>
        <button className={styles.submit} onClick={onSubmit}>
          {isLoading ? "Loading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
