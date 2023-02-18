import React from "react";
import styles from "@/styles/components/Tag.module.scss";
import Link from "next/link";

const Color = require("color");

const Tag = (props) => {
  const { color, content, link, id } = props;

  if (Color(color).lightness() < 60) {
    var backgroundColor = Color(color).lighten(0.2);
  } else {
    var backgroundColor = Color(color).darken(0.2);
  }

  const borderColor = Color(backgroundColor).darken(0.2).hex();
  const textColor = Color(backgroundColor).darken(0.6).hex();

  return (
    <div
      className={styles.wrapper}
      id={id}
      style={{
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
      }}
    >
      <Link href={link}>{content}</Link>
    </div>
  );
};

export default Tag;
