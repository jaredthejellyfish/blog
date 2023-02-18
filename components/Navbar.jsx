import React, { useState } from "react";
import styles from "@/styles/components/Navbar.module.scss";

import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import mediumLogo from "@/public/medium.png";
import pfp from "@/public/pfp.webp";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/context/UserContext";
import useLogout from "@/hooks/useLogout";

import isImage from "@/lib/isImage";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const { isAuth, user, isLoading, isError } = useAuth();
  const logout = useLogout();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText("");
    console.log(searchText);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <nav>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Link href="/">
            <Image
              priority
              src={mediumLogo}
              alt="Medium Logo"
              className={styles.logo}
            />
          </Link>

          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={searchText}
            />

            <button className={styles.search_button} type="submit">
              <BsSearch />
            </button>
          </form>
        </div>

        <div className={styles.right}>
          {!isLoading && !isError && isAuth && user ? (
            <div className={styles.functions_wrapper}>
              <Link href="/posts/create">
                <div className={styles.write_wrapper}>
                  <FiEdit size={18} />
                  <p className={styles.write_text}>Write</p>
                </div>
              </Link>

              <div className={styles.pfp_wrapper}>
                <Image
                  src={isImage(user.avatarURL) ? user.avatarURL : pfp}
                  className={styles.pfp}
                  alt={user.username}
                  width={32}
                  height={32}
                  onClick={() => {
                    console.log("logged out");
                    logout();
                  }}
                />
                <MdKeyboardArrowDown className={styles.pfp_arrow} />
              </div>
            </div>
          ) : (
            <div className={styles.login_wrapper}>
              <Link href="/auth/login" className={styles.login_button}>
                Login
              </Link>

              <Link href="/auth/register" className={styles.signup_button}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
