import React, { useContext } from "react";
import { AuthContext } from "../security/AuthContext";

const Footer = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext.number);

  return (
    <footer className="footer">
      <div className="container">Footer</div>
    </footer>
  );
};

export default Footer;
