"use client";
import React, { useState } from "react";
import "../styles/newsletter.css";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import SubscribeNewsLetter from "@/utils/SubscribeNewsLetter";
import { toast } from "react-toastify";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const HandleSubmitNewsletter = async () => {
    try {
      await SubscribeNewsLetter(email);
      toast.success("NewsLetter Subscribed");
      setEmail("");
    } catch (error) {
      ErrorNotificationHandler(error);
    }
  };
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
              <input
                type="text"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="desktop_newsletter_btn"
                disabled={!email}
                onClick={HandleSubmitNewsletter}
              >
                Subscribe
              </button>
              <button
                className="mob_newsLetter_btn"
                disabled={!email}
                onClick={HandleSubmitNewsletter}
              >
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
