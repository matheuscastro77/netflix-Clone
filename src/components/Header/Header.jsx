import React from "react";
import "./Header.css";

const Header = ({ visibleHeader }) => {
  return (
    <header className={visibleHeader ? "black" : ""}>
      <div className="header--logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
          alt="logo"
        />
      </div>
      <div className="header--user">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
          alt="userlogo"
        />
      </div>
    </header>
  );
};

export default Header;
