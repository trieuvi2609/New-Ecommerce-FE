"use client";
import * as React from "react";
import "./styles.scss";
import Image from "next/image";
import { send } from "@/public/assets/icons";
import appstore from "@/public/assets/images/appstore.png";
import qr from "@/public/assets/images/qr.png";
import ggplay from "@/public/assets/images/ggplay.png";
import Link from "next/link";
import InputComponent from "@/components/common/Input";

const Footer: React.FunctionComponent = () => {
  return (
    <div className="footer">
      <div className="ft-block exclusive">
        <span className="block-main-tt">Exclusive</span>
        <span className="block-sub-tt">Subscribe</span>
        <div className="content">
          <span>Get 10% off your first order</span>
          <div className="w-full">
            <InputComponent
              className="input"
              icon={<Image className="icon-act" src={send} width={24} height={24} alt="email" />}
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      <div className="ft-block support">
        <span className="block-main-tt">Support</span>
        <div className="content">
          <span>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</span>
          <span>exclusive@gmail.com</span>
          <span>+88015-88888-9999</span>
        </div>
      </div>

      <div className="ft-block account">
        <span className="block-main-tt">Account</span>
        <div className="content">
          <Link href={"/"}>My Account</Link>
          <Link href={"/"}>Login / Register</Link>
          <Link href={"/"}>Cart</Link>
          <Link href={"/"}>Wishlist</Link>
          <Link href={"/"}>Shop</Link>
        </div>
      </div>

      <div className="ft-block quick-link">
        <span className="block-main-tt">Quick Link</span>
        <div className="content">
          <Link href={"/"}>Privacy Policy</Link>
          <Link href={"/"}>Terms Of Use</Link>
          <Link href={"/"}>FAQ</Link>
          <Link href={"/"}>Contact</Link>
        </div>
      </div>

      <div className="ft-block app">
        <span className="block-main-tt">Download App</span>
        <div className="content">
          <span>Save $3 with App New User Only</span>
          <div className="cnt-img">
            <div className="qr">
              <Image width={76} height={76} src={qr} alt="qr" />
            </div>
            <div className="download">
              <Image width={104} height={30} src={ggplay} alt="ggplay" />
              <Image width={104} height={30} src={appstore} alt="appstore" />
            </div>
            <div className="social"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
