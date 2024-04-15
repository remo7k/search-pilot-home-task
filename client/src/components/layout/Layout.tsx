import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import LogoSVG from "../../assets/logo.svg";
import s from "./style.module.less";
import React from "react";
import CreateNewProductButton from "../createNewProductButton/CreateNewProductButton";

const Layout = () => {
  const location = useLocation();

  const showButton =  location.pathname === "/";

  return (
    <div className={s.gridContainer}>
      <nav className={s.nav}>
        <Link to={"/"}>
          <AccessibleIcon.Root label="SearchPilot logo">
            <LogoSVG />
          </AccessibleIcon.Root>
        </Link>
        <span>home exercise</span>
        {showButton && <CreateNewProductButton />}
      </nav>
      <Outlet />
      <footer className={s.footer}/>
    </div>
  );
};

export default Layout;
