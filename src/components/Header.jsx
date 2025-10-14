import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Left: Logo */}
      <a href="/">
      <img
        src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/8gxGtPEVqtv0pHte3WSh/media/68da47adf00445478b6d27e4.png"
        alt="Logo"
        className="header-logo"
        />
        </a>

      {/* Right: Home Button */}
      <button onClick={() => navigate("/")} className="home-button">
        Home
      </button>
    </header>
  );
};

export default Header;
