import React from "react";
import styles from "@/styles/components/Help.module.scss";

const Help = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <div className={styles.heading_section}>
          <h3 className={styles.title}>#help</h3>
        </div>
        <div className={styles.content_section}>
          <p className={styles.text}>Open source or not?</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
