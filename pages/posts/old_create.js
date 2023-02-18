import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCreatePost from "@/hooks/useCreatePost";
import styles from "@/styles/pages/Login.module.scss";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { mutate: post, isLoading, isError } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    post({
      title: "hi1",
      content: "hi",
      summary: "small hi",
      category: "stonks",
      tags: {},
    });
  };

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(isError)
      toast.error("There was an error creating your post.", {
        position: "top-right",
      });
    }
  }, [isLoading, isError]);

  return (
    <div className={styles.wrapper}>

    </div>
  );
};

export default CreatePost;
