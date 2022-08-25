import React, { useRef } from "react";
import darkTheme from "./asideDark.module.css";
import lightTheme from "./asideLight.module.css";
import Discord from "../../../icons/Discord.jsx";
import CursoIcon from "../../../icons/libro.jsx";
import { RiGameLine } from "react-icons/ri";
import { ThemeProvider } from "styled-components";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  let style = props;
  let navBar = useRef(null);
  let logo = useRef(null);
  const gif1 = "https://i.imgur.com/3PgliiZ.gif";
  const gif2 = "https://i.imgur.com/TUv0sba.gif";
  const png = "https://i.imgur.com/v4fa986.png";

  const handleMouseEnter = () => {
    logo.current.setAttribute("src", gif1);
  };
  const handleMouseLeave = () => {
    logo.current.setAttribute("src", gif2);
  };

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div
        ref={navBar}
        className={style.navbar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink to="/home">
          <img
            ref={logo}
            src={png}
            alt="logo"
            className={style.logo}
            referrerPolicy="no-referrer"
          />
        </NavLink>
        <div className={style.icon}>
          <CursoIcon />
          <NavLink to="/courses" className={style.hide}>
            Cursos
          </NavLink>
        </div>
        <div className={style.icon}>
          <Discord />
          <a href="https://discord.gg/eVpqWgmD" className={style.hide}>Unete a Discord!</a>
        </div>
        <div className={style.icon}>
            <RiGameLine />
            <NavLink to="/playground" className={style.hide}>
              Playground
            </NavLink>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBar;
