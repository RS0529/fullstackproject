import React from "react";
import ".Layout.css";
const Layout = (props) => {
  return (
    <>
      <header className="main-header">{props.header}</header>
      <main className="content">{props.children}</main>
    </>
  );
};

export default Layout;
