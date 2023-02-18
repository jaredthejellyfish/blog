import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import Editor, { Plugins } from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import styles from "@/styles/pages/CreatePost.module.scss";
import useCreatePost from "@/hooks/useCreatePost";

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
  const { mutate: post, isLoading, isError } = useCreatePost();

  const mdParser = new MarkdownIt(/* Markdown-it options */);

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
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <div className={styles.submit_section}>
        <button className={styles.submit} onClick={onSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
