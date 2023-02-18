import React, { useState, useEffect } from "react";
import styles from "@/styles/components/Categories.module.scss";

const Categories = (props) => {
  const categories = [
    "🏡 Home",
    "📜 Listings",
    "🎙 Podcasts",
    "📹 Videos",
    "💵 Sponsors",
    "📔 About",
    "☎️ Contact",
    "🧑‍🦯 Guides",
  ];

  const [category, setCategory] = useState(categories[0]);

  const categoryRef = React.createRef();

  const handleCategory = (e) => {
    setCategory(categories[e.target.id]);
    props.categorySelector(categories[e.target.id].split(" ")[1].toLowerCase());
    e.target.classList.add(styles.selected);
    categoryRef.current.childNodes.forEach((child) => {
      if (child.id !== e.target.id) {
        child.classList.remove(styles.selected);
      }
    });
  };

  useEffect(() => {
    props.categorySelector(categories[0].split(" ")[1].toLowerCase());
    categoryRef.current.childNodes[0].classList.add(styles.selected);
  }, []);

  return (
    <div className={styles.wrapper} ref={categoryRef}>
      {categories.map((category, index) => (
        <div
          className={styles.category}
          key={index}
          id={index}
          onClick={handleCategory}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
