import image1 from "../media/marble table.jpg";
import image2 from "../media/table2.png";
import image3 from "../media/IMG-20230415-WA0010.jpg";
import image4 from "../media/table.png";
import image5 from "../media/signle sofa 2.png";
import image6 from "../media/signle sofa.png";
import image7 from "../media/home sofa.png";

// PAYMENT GATE PAYS IMAGES ---------------------------

import ApplyePay from "../media/ApplePayLogo.png";
import masterCard from "../media/MasterCard.png";
import MaesteroCard from "../media/MaestroLogo.png";
import Paypal from "../media/PayPal-Logo.png";
import Stripe from "../media/Stripe-Logo.png";
import GPay from "../media/gpayLogo.jpg";

// PAYMENT GATE PAYS IMAGES ---------------------------

import {
  FacebookRounded,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";

// --------------------------------------------------------

// CATEGORY SHOP ITEM IMAGES --------------------------------

import bedsImg from "../media/categoryImgs/beds.jpg";
import chairsImg from "../media/categoryImgs/chairs.webp";
import DiningtablesImg from "../media/categoryImgs/diningtables.jpeg";
import wardrobesImg from "../media/categoryImgs/wardrobes.jpeg";
import sofasImg from "../media/categoryImgs/sofas.jpg";

// CATEGORY SHOP ITEM IMAGES --------------------------------

export const TopbarLinks = [
  { name: "Home", route: "/" },
  { name: "Categories", route: "/categories" },
  { name: "Shop", route: "/shop" },
  { name: "Contact Us", route: "/contactus" },
  { name: "Privacy Policies", route: "/privacy" },
];

export const HeroCounts = [
  { title: "Happy Clients", count: "88K" },
  { title: "Premium Products", count: "98K" },
  { title: "Projects Finished", count: "686" },
];

export const CategoryData = [
  { image: sofasImg, title: "Sofas Sets", count: "150" },
  { image: DiningtablesImg, title: "Dining Tables", count: "88" },
  { image: bedsImg, title: "Beds", count: "92" },
  { image: wardrobesImg, title: "Wardrobes", count: "139" },
];

export const ProductData = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
];

export const FooterPageLinks = [
  { name: "Home", route: "/" },
  { name: "About", route: "/" },
  { name: "Categories", route: "/" },
  { name: "Shop", route: "/" },
  { name: "Privacy Policy", route: "/" },
  { name: "Faqs", route: "/" },
];

export const FotterCategoriesLinks = [
  { name: "Sofas", route: "/" },
  { name: "Beds", route: "/" },
  { name: "Chairs", route: "/" },
  { name: "Tables", route: "/" },
  { name: "Lamps", route: "/" },
  { name: "Wardrobe", route: "/" },
];

export const CategoryShopData = [
  { name: "Sofas", image: image6 },
  { name: "Chairs", image: image3 },
  { name: "Lamps", image: image4 },
  { name: "Table", image: image1 },
];

export const options_styles = {
  container: (provided) => ({
    ...provided,
    height: "100%",
  }),
  control: (provided) => ({
    ...provided,
    height: "100%",
    border: "1px solid rgba(220,220,220)",
    outline: "none",
    boxShadow: "none",
    cursor: "pointer",
    background: "#000",
    padding: "0px 20px",
    borderRadius: "50px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

export const PaymentsOffer = [
  ApplyePay,
  GPay,
  masterCard,
  MaesteroCard,
  Stripe,
  Paypal,
];

export const SocialMediaAccountsData = [
  {
    name: "Facebook",
    link: "",
    icon: <FacebookRounded />,
  },
  {
    name: "Instagram",
    link: "",
    icon: <Instagram />,
  },
  {
    name: "Twitter",
    link: "",
    icon: <Twitter />,
  },
  {
    name: "YouTube",
    link: "",
    icon: <YouTube />,
  },
];

export const CategoryShopItems = [
  {
    name: "Beds",
    query: "beds",
    image: bedsImg,
  },
  {
    name: "Wardrobes",
    query: "wardrobes",
    image: wardrobesImg,
  },
  {
    name: "Sofas",
    query: "sofas",
    image: sofasImg,
  },
  {
    name: "Dining Tables",
    query: "diningtables",
    image: DiningtablesImg,
  },
  {
    name: "Chairs",
    query: "chairs",
    image: chairsImg,
  },
];

// Country Input Options

export const phone_options = {
  disableDropdown: true,
  country: "gb",
  countryCodeEditable: false,
};
