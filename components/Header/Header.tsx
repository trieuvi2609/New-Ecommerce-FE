"use client";
import * as React from "react";
import "./styles.scss";
import Link from "next/link";
import { useAppContext } from "@/context";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { user, loginUser, logoutUser } = useAppContext();
  return (
    <>
      <div className="header-wrapper">
        <div className="logo">Exclusive</div>
        <div className="menu-list">
          <ul>
            <Link href={"/"} className="menu-item">
              Home
            </Link>
            <Link href={"/dashboard"} className="menu-item">
              Dashboard
            </Link>
          </ul>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="What are you looking for" />
        </div>
        <span className="heart-icon"></span>
        <Link href={"/cart"} className="cart-icon">
          Cart
        </Link>
        <Link href={"/signup"} className="sign-up-icon">
          Sign Up
        </Link>
        {user?.isAuth ? (
          <div style={{ padding: "20px" }}>
            <Link style={{ marginRight: "30px" }} href={"/user-info"}>
              {user?.userName}
            </Link>
            <a
              style={{
                cursor: "pointer",
              }}
              onClick={() => logoutUser()}
            >
              Logout
            </a>
          </div>
        ) : (
          <Link href={"/login"} className="login">
            Login{" "}
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
