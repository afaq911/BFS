"use client";
import React from "react";
import "../styles/contactform.css";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SocialMediaAccountsData } from "@/constants/WebData";

const ContactDetails = [
  { title: "Mobile Number", value: "+44 1234 3255 554", icon: <CallIcon /> },
  {
    title: "Email",
    value: "britishfurnituresuppliers @gmail.com",
    icon: <EmailIcon />,
  },
  {
    title: "Address",
    value: "University of, Oxford Rd, Manchester M13 9PL, United Kingdom",
    icon: <LocationOnIcon />,
  },
];

const ContactForm = () => {
  return (
    <div className="mainContactusForm">
      <div className="contactFormHeading">
        <h2>Get in touch</h2>
      </div>
      <div className="innerContactForm">
        <form className="formContainer">
          <div className="inputBx">
            <label>Full Name</label>
            <input type="text" placeholder="" />
          </div>

          <div className="formGrid">
            <div className="inputBx">
              <label>Email</label>
              <input type="email" placeholder="" />
            </div>
            <div className="inputBx">
              <label>Mobile No</label>
              <input type="tel" placeholder="" />
            </div>
          </div>
          <div className="inputBx">
            <label>Message</label>
            <textarea type="text" placeholder="" />
          </div>

          <div className="formSubmitBtn">
            <button>Submit</button>
          </div>
        </form>

        {/* OTHER CONTACT DETAILS */}

        <div className="otherContactDetails">
          <div className="innerOtherContactDetails">
            {ContactDetails?.map((item, index) => {
              return (
                <div className="otherDetailsBx" key={index + 1}>
                  <div className="otherDetailsIcon">{item?.icon}</div>
                  <div className="otherDetailsInfo">
                    <h2>{item?.title}</h2>
                    <p>{item?.value}</p>
                  </div>
                </div>
              );
            })}

            <h2 className="followsocialcontact">Follow Us</h2>
            <div className="contactSocailMedia">
              {SocialMediaAccountsData?.map((item) => {
                return (
                  <label className={item?.name} key={item?.name}>
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

export default ContactForm;
