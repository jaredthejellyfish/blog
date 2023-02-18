import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useRegister from "@/hooks/useRegister";
import styles from "@/styles/pages/Register.module.scss";

const Register = () => {
  // const { mutate: registerUser, isLoading, isError } = useRegister();
  const { mutate: register, isLoading, isError } = useRegister();

  const {
    register: registerForm,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    register(data);
    return;
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      if (errors.email)
        toast.error("Email is required.", { position: "top-right" });
      if (errors.password)
        toast.error("Password is required.", { position: "top-right" });
      if (errors.passwordConfirm)
        toast.error("Passwords do not match.", { position: "top-right" });
      if (errors.acceptTerms)
        toast.error("You must accept the terms.", { position: "top-right" });
    }
  }, [errors]);

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("There was an error registering your account.", {
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
        <h1 className={styles.login_heading}>Welcome! </h1>
        <input {...registerForm("username")} placeholder="username" />

        <input
          {...registerForm("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="email"
        />

        <input
          type="password"
          {...registerForm("password", { required: true, minLength: 8 })}
          placeholder="password"
        />

        <input
          type="password"
          {...registerForm("passwordConfirm", {
            required: true,
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          placeholder="confirm password"
        />

        <div className={styles.remember_wrapper}>
          <input
            type="checkbox"
            {...registerForm("acceptTerms")}
            className={`form-check-input ${
              errors.acceptTerms ? "is-invalid" : ""
            }`}
          />
          <p className="form-check-label">
            I accept the terms and conditions laid out here.
          </p>
        </div>

        <button type="submit">{isLoading ? "Loading..." : "Register"}</button>
      </form>
    </div>
  );
};

export default Register;
