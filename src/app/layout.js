import ReduxProvider from "@/redux/ReduxProvider";
import "../styles/globals.css";
import { Inter, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import GoogleRedirectProvider from "@/providers/RedirectGoogleProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "BFS - British Furniture Suppliers",
  description:
    "We at British Furniture Suppliers are committed to bring you the complete range of household furniture, ranging from stylish and luxury wardrobes, sofas, beds, ottomon boxes, dining tables, chairs, kids beds to traditional and classic Pakistani and Turkish settees. All this at highly affordable price along with various payment options and home delivery. Please leave us a message for any queries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={poppins.className + " " + inter.className}
        suppressHydrationWarning={true}
      >
        <NextTopLoader color="#FA698E" showSpinner={false} height={4} />
        <ToastContainer />
        <ReduxProvider>
          <GoogleRedirectProvider>{children}</GoogleRedirectProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
