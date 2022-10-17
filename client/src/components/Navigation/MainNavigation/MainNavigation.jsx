import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <>
      <nav className="main-nav">
        <div className="main-nav__logo">
          <NavLink to="/">
            <Logo logo="Blog" />
          </NavLink>
        </div>
        <div className="spacer" />
        <ul className="main-nav__items">
          <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
        </ul>
      </nav>
    </>
  );
};

export default MainNavigation;
