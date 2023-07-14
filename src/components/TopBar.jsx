"use client";
import React, { useEffect, useState } from "react";
import "../styles/Topbar.css";
import Image from "next/image";
import Logo from "@/media/logo.png";
import Link from "next/link";
import { TopbarLinks } from "@/constants/WebData";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Badge from "@mui/material/Badge";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { avatarNameHandler } from "@/utils/avatarName";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { userLogout } from "@/redux/userSlice";
import { toast } from "react-toastify";
import CategoryDropDown from "./CategoryDropDown";

const TopBar = () => {
  const currentUser = useSelector((state) => state.user.user);
  const Cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [isTopBarActive, setIsTopBarActive] = useState(false);
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const CategoryTab = document.querySelector(".topbarNavItem.Categories");
    const CategoryMenu = document.getElementById("TopCaregoryDropdown");

    const ActiveClass = () => {
      CategoryMenu?.classList.add("active");
    };

    const RemoveClass = () => {
      CategoryMenu?.classList.remove("active");
    };

    CategoryTab?.addEventListener("mouseover", ActiveClass);

    CategoryMenu?.addEventListener("mouseover", ActiveClass);

    CategoryTab?.addEventListener("mouseleave", RemoveClass);

    CategoryMenu?.addEventListener("mouseleave", RemoveClass);
  }, []);

  // Toggle Mobile Navbar --------------------------------------------------

  const HandleTopBarNavigation = () => {
    setIsTopBarActive(!isTopBarActive);
  };

  const HandleLogout = () => {
    dispatch(userLogout());
    toast.success("Logged Out");
  };

  const badgeOptions = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };

  return (
    <>
      <div className="mainTopbarContainer">
        <div className="innerTopbarContainer">
          <div className="mainTopBarLogo">
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="British Furniture Suppliers Logo ( BFS )"
                fill="cover"
              />
            </Link>
          </div>

          <div className="mobileViewNavContainer">
            <div
              className="hambugerMenu"
              id="hmburger"
              onClick={HandleTopBarNavigation}
            >
              <div className="bar"></div>
            </div>

            <div className="navItemCta">
              <label className="CtaIcons">
                <SearchIcon />
              </label>

              <Link href={"/cart"}>
                <label className="ctaBtnsNavBar">
                  <Badge
                    {...badgeOptions}
                    badgeContent={Cart?.length}
                    color="primary"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                  <h4>Cart</h4>
                </label>
              </Link>
            </div>
          </div>

          <div className={`mainInnerTopbar ${isTopBarActive ? "active" : ""}`}>
            <div className="topbarNavItems">
              {TopbarLinks?.map((item, index) => {
                let isActive = pathname === item.route;
                if (item?.name === "Categories") {
                  return (
                    <div
                      key={index + 1}
                      className={
                        isActive
                          ? "activeTopLink moblie_link_full_width"
                          : "moblie_link_full_width"
                      }
                    >
                      <div className={`topbarNavItem ${item?.name}`}>
                        <li className="topbarNavItemText mobileCategoryArrow">
                          {item?.name} <KeyboardArrowDownIcon />
                        </li>
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            transition={{ duration: 0.3, type: "spring" }}
                            className="topbarNavItemLine"
                          />
                        )}

                        <CategoryDropDown />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index + 1} className="moblie_link_full_width">
                      <Link
                        href={item?.route}
                        className={isActive ? "activeTopLink" : ""}
                      >
                        <div className={`topbarNavItem ${item?.name}`}>
                          <li className="topbarNavItemText">{item?.name}</li>
                          {isActive && (
                            <motion.div
                              layoutId="active-tab"
                              transition={{ duration: 0.3, type: "spring" }}
                              className="topbarNavItemLine"
                            />
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
            <div className="navItemCta">
              <label className="CtaIcons">
                <SearchIcon />
              </label>

              <Link href={"/cart"}>
                <label className="ctaBtnsNavBar">
                  <Badge
                    {...badgeOptions}
                    badgeContent={Cart?.length}
                    color="primary"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                  <h4>Cart</h4>
                </label>
              </Link>
              {currentUser ? (
                <>
                  <label
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    className="ctaBtnsNavBar loggedInAvatar"
                  >
                    {avatarNameHandler(currentUser?.user?.username)}
                  </label>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={HandleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href={"/login"}>
                  <label className="ctaBtnsNavBar">
                    <PersonOutlinedIcon />
                    <h4>Join</h4>
                  </label>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
