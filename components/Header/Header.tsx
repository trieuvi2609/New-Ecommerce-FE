"use client";
import * as React from "react";
import "./styles.scss";
import Link from "next/link";
import { useAppContext } from "@/context";
import Image from "next/image";
import { cart, heart, search, user as userIcon } from "@/public/assets/icons";
import { clsx } from "clsx";
import InputSingle from "@/components/common/InputSingle";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { user, loginUser, logoutUser } = useAppContext();

  const isActive = (path: string) => {
    return clsx({
      underline: window.location.pathname === path,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // search here
    console.log(event.target.value);
  };

  return (
    <div className="header">
      <div className="promotion">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <Link href={"/"} className="ml-2 font-semibold underline">
          Shop Now
        </Link>
      </div>

      <div className="navbar">
        <div className="logo">Exclusive</div>
        <div className="nav-list">
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
        </div>
        <div className="nav-act">
          <InputSingle
            icon={<Image className="icon-act" src={search} width={24} height={24} alt="search_prod" />}
            placeholder="What are you looking for?"
            onChange={onChange}
          />
          <Image className="icon-act" src={heart} width={24} height={24} alt="fav_prod" />
          <Image className="icon-act" src={cart} width={28} height={28} alt="cart" />
          {user?.isAuth ? (
            <>
              <span>
                Hello,<span className="font-bold">{user.userName}</span>!
              </span>
              <a
                style={{
                  cursor: "pointer",
                }}
                onClick={() => logoutUser()}>
                Logout
              </a>
            </>
          ) : (
            <Link href={"/login"}>
              <Image className="icon-act" src={userIcon} width={32} height={32} alt="user" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
