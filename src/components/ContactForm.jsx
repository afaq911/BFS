"use client";
import React, { useState } from "react";
import "../styles/contactform.css";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SocialMediaAccountsData } from "@/constants/WebData";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";
import { axiosinstance } from "@/utils/axiosinstance";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ContactDetails = [
  { title: "Mobile Number", value: "+44 7754 030987", icon: <CallIcon /> },
  {
    title: "Email",
    value: "britishfurnituresuppliers @gmail.com",
    icon: <EmailIcon />,
  },
  {
    title: "Address",
    value: "BFS UNIT 2 LUND STREET BRADFORD WEST YORKSHIRE BD8 0HS",
    icon: <LocationOnIcon />,
  },
];

const ContactForm = () => {
  const [values, setvalues] = useState();
  const [loading, setLoading] = useState(false);

  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosinstance.post("/messages", {
        data: {
          ...values,
        },
      });
      toast.success(
        "Thanks for submitting you're application. Our team will contact you soon!"
      );
      setLoading(false);
      setvalues();
    } catch (err) {
      ErrorNotificationHandler(err);
      setLoading(false);
    }
  };

  return (
    <div className="mainContactusForm">
      <div className="contactFormHeading">
        <h2>Get in touch</h2>
      </div>
      <div className="innerContactForm">
        <form className="formContainer">
          <div className="inputBx">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              placeholder=""
              onChange={(e) =>
                setvalues({ ...values, [e.target.name]: e.target.value })
              }
              value={values?.username || ""}
            />
          </div>

          <div className="formGrid">
            <div className="inputBx">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder=""
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
                value={values?.email || ""}
              />
            </div>
            <div className="inputBx">
              <label>Mobile No</label>
              <input
                type="tel"
                name="mobileno"
                placeholder=""
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
                value={values?.mobileno || ""}
              />
            </div>
          </div>
          <div className="inputBx">
            <label>Message</label>
            <textarea
              type="text"
              placeholder=""
              name="message"
              onChange={(e) =>
                setvalues({ ...values, [e.target.name]: e.target.value })
              }
              value={values?.message || ""}
            />
          </div>

          <div className="formSubmitBtn">
            <button onClick={HandleSubmitForm} disabled={loading}>
              {loading ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
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
