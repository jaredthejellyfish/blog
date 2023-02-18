import Feed from "@/components/Feed";
import Categories from "@/components/Categories";
import Help from "@/components/Help";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [category, setCategory] = useState(null);

  const handleCategory = (category) => {
    setCategory(category);
  };

  return (
    <>
      <Categories categorySelector={handleCategory} />
      <Feed category={category} />
      <Help />
    </>
  );
}
