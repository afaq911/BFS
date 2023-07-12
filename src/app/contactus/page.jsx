import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import TopBar from "@/components/TopBar";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <TopBar />
      <ContactForm />
      <ContactMap />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default ContactUs;
