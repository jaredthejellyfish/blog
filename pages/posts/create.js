import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCreatePost from "@/hooks/useCreatePost";
import styles from "@/styles/pages/Login.module.scss";
import { toast } from "react-toastify";

const CreatePost = () => {
  // const { mutate: registerUser, isLoading, isError } = useRegister();
  const { mutate: post, isLoading, isError } = useCreatePost();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("hi")
    post({title: "hi1", text: "hi", summary: "small hi", category: "stonks", tags: ""});
  };

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error("There was an error creating your post.", {
        position: "top-right",
      });
    }
  }, [isLoading, isError]);

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default CreatePost;
