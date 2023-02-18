import React, { useState } from "react";
import styles from "@/styles/components/Navbar.module.scss";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import mediumLogo from "@/public/medium.png";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import Avatar from "react-avatar";

import pb from "@/lib/pocketbase";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const { isAuth, user, isLoading } = useAuth();

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
          <div className={styles.login_wrapper}>
            {!isLoading && isAuth ? (
              <>
                <Link href="/posts/create">
                  <div className={styles.write_wrapper}>
                    <FiEdit size={18} />
                    <p>Write</p>
                  </div>
                </Link>

                <div className={styles.pfp_wrapper}>
                  <Avatar
                    src={user.avatar ? user.avatar : null}
                    name={user.username}
                    round
                    size={32}
                    onClick={() => {
                      pb.authStore.clear();
                    }}
                  />
                  <MdKeyboardArrowDown className={styles.pfp_arrow} />
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={styles.login_button}>
                  Login
                </Link>

                <Link href="/auth/register" className={styles.signup_button}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
