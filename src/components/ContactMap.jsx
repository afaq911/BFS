"use client";
import React from "react";

const ContactMap = () => {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.711747955993!2d-1.8015866239717166!3d53.79461774108912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487be6918e091695%3A0xb14870801cce0945!2s2%20Lund%20St%2C%20Bradford%20BD8%200HS%2C%20UK!5e0!3m2!1sen!2s!4v1690483015813!5m2!1sen!2s"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactMap;
