"use client";
import React from "react";

const ContactMap = () => {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d214429.5351953854!2d72.8989696!3d32.8859648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2s!4v1686473166103!5m2!1sen!2s"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactMap;
