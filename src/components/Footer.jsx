"use client";
import React from "react";
import "../styles/footer.css";
import Link from "next/link";
import {
  FooterPageLinks,
  FotterCategoriesLinks,
  SocialMediaAccountsData,
} from "@/constants/WebData";
import Image from "next/image";
import { Copyright } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  return (
    <div className="mainFooterContainer">
      <div className="innerFooterContainer">
        <div className="newsLetterTab">
          <h2>Enter your email to get the latest news</h2>

          <div className="newsLetterInput">
            <input type="text" placeholder="Enter Your Email" />
            <button className="desktop_newsletter_btn">Subscribe</button>
            <button className="mob_newsLetter_btn">
              <SendIcon />
            </button>
          </div>

          <p>
            <span>
              <Copyright />
            </span>
            2022 BFS All Rights Reserved
          </p>
        </div>

        <div className="footerLinks">
          <h2>Links</h2>
          {FooterPageLinks?.map((item, index) => (
            <Link key={index} href={item?.route}>
              <li>{item?.name}</li>
            </Link>
          ))}
        </div>

        <div className="footerLinks">
          <h2>Categories</h2>
          {FotterCategoriesLinks?.map((item, index) => (
            <Link key={index} href={item?.route}>
              <li>{item?.name}</li>
            </Link>
          ))}
        </div>

        <div className="footerSocailTabs">
          <div className="footerLogo">
            <Image
              src={require("../media/logo.png")}
              alt="FooterLogo"
              fill="cover"
            />
          </div>

          <div className="footerSocail">
            <h2>Follow Us</h2>

            <div className="socailMediaIcons">
              {SocialMediaAccountsData?.map((item) => {
                return (
                  <label className="socailIcon" key={item?.name}>
                    {item?.icon}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
