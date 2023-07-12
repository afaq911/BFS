"use client";
import React from "react";
import "../styles/newsletter.css";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";

const NewsLetter = () => {
  return (
    <div className="mainNewLetterContainer">
      <div className="innerNewsLetterContainer">
        <div className="newsLetterInfo">
          <div className="innerInfoDetailsNewsletter">
            <h2>Subscribe Our Newsletter</h2>
            <p>
              Subscribe to the new to receive updates on new arrivals and
              discount information and Others.
            </p>

            <div className="newsLetterInput">
              <input type="text" placeholder="Enter Your Email" />
              <button className="desktop_newsletter_btn">Subscribe</button>
              <button className="mob_newsLetter_btn">
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="newsLetterSvg">
          <div className="innerSvg">
            <Image
              src={require("../media/newslettersvg.png")}
              alt="SVG_NewsLetter"
              fill="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
