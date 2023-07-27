"use client";
import React, { useEffect, useState } from "react";
import "../styles/footer.css";
import Link from "next/link";
import { FooterPageLinks, SocialMediaAccountsData } from "@/constants/WebData";
import Image from "next/image";
import { Copyright } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { axiosinstance } from "@/utils/axiosinstance";
import SubscribeNewsLetter from "@/utils/SubscribeNewsLetter";
import { toast } from "react-toastify";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState();

  // Subsribe Email ----------------------------------------------------------------------

  const HandleSubmitNewsletter = async () => {
    try {
      await SubscribeNewsLetter(email);
      toast.success("NewsLetter Subscribed");
      setEmail("");
    } catch (error) {
      ErrorNotificationHandler(error);
    }
  };

  // Fetch Categories --------------------------------------------------------------------

  useEffect(() => {
    const GetCategories = async () => {
      try {
        const res = await axiosinstance.get(
          "/categories?populate=*&pagination[start]=0&pagination[limit]=6"
        );
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetCategories();
  }, []);

  return (
    <div className="mainFooterContainer">
      <div className="innerFooterContainer">
        <div className="newsLetterTab">
          <h2>Enter your email to get the latest news</h2>

          <div className="newsLetterInput">
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="desktop_newsletter_btn"
              onClick={HandleSubmitNewsletter}
              disabled={!email}
            >
              Subscribe
            </button>
            <button
              className="mob_newsLetter_btn"
              onClick={HandleSubmitNewsletter}
              disabled={!email}
            >
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
          {categories?.data?.map((item, index) => (
            <Link
              key={index}
              href={`/shop?category=${item?.attributes?.title}`}
            >
              <li>{item?.attributes?.title}</li>
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
