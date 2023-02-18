import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useLogin from "@/hooks/useLogin";
import styles from "@/styles/pages/Login.module.scss";
import { toast } from "react-toastify";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/router";

const Login = () => {
  // const { mutate: registerUser, isLoading, isError } = useRegister();
  const { mutate: login, isLoading, isError } = useLogin();
  const router = useRouter();

  if (pb.authStore.isValid) {
    router.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      if (errors.email)
        toast.error("Email is required.", { position: "top-right" });
      if (errors.password)
        toast.error("Password is required.", { position: "top-right" });
    }
  }, [errors]);

  useEffect(() => {
    if (!isLoading && isError) {
      alert("There was an error registering your account.");
    } else if (!isLoading && !isError) {
    }
  }, [isLoading, isError]);

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <h1 className={styles.login_heading}>Welcome back! </h1>
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="email"
        />
        {errors.lastName && <p>Last name is required.</p>}

        <input
          type="password"
          {...register("password", { required: true, minLength: 8 })}
          placeholder="password"
        />
        {errors.password && toast.error("Password is required.")}

        <div className={styles.remember_wrapper}>
          <input type="checkbox" {...register("rememberMe")} />
          <p className="form-check-label">Remember me</p>
        </div>

        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
