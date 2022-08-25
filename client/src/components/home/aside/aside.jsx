import React, { useRef } from "react";
import darkTheme from "./asideDark.module.css";
import lightTheme from "./asideLight.module.css";
import CodeIcon from "../../../icons/code.jsx";
import Discord from "../../../icons/Discord.jsx";
import CursoIcon from "../../../icons/libro.jsx";
import { ThemeProvider } from "styled-components";
import { NavLink } from "react-router-dom";
import Home from "../../../icons/Home";
import { useSelector } from "react-redux";
import Help from "../../../icons/Help";

let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function NavBar(props) {
  let user = useSelector(store => store.user)
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
  let fecha = user.Vencimiento && user.Vencimiento.fecha ? user.Vencimiento.fecha.split(" ") : null;
  let date = new Date().toString().split(" ");
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div
        ref={navBar}
        className={user.isPremium && fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1])) ? style.navgold : style.navbar}
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
          <NavLink to="/Home"><Home /></NavLink>
          <NavLink to="/Home" className={style.hide}>
            Home
          </NavLink>
        </div>
        <div className={style.icon}>
          <NavLink to="/courses"><CursoIcon /></NavLink>
          <NavLink to="/courses" className={style.hide}>
            Cursos
          </NavLink>
        </div>
        <div className={style.icon}>
          <NavLink to="/favoritos"><CodeIcon /></NavLink>
          <NavLink to="/favoritos" className={style.hide}>
            Mis Cursos
          </NavLink>
        </div>
        <div className={style.icon}>
          <NavLink to="/AboutUs"><Help /></NavLink>
          <NavLink to="/AboutUs" className={style.hide}>
          Sobre Nosotros
          </NavLink>
        </div>
        <div className={style.icon}>
          <a href="https://discord.gg/jUCT93a9UP" target="_blank" rel="noopener noreferrer"><Discord /></a>
          <a href="https://discord.gg/jUCT93a9UP" target="_blank" rel="noopener noreferrer" className={style.hide}>
            Unete a Discord!
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBar;
