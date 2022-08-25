import { useState } from "react";
import { useSelector } from "react-redux";

// import shildren components
import YourCourse from "./yourCourse/yourCourse";
import UsernamePopUp from "./popUps/usernamePopUp.jsx";
import PasswordPopUp from "./popUps/passwordPopUp.jsx";
import ImgPopUp from "./popUps/imgPopUp";

// import stiles
import darkTheme from "./perfilDark.module.css";
import lightTheme from "./perfilLight.module.css";

import JSIcon from "../../icons/javascript";
import { ThemeProvider } from "styled-components";


const Perfil = (props) => {
  var style = darkTheme;
  let fecha = new Date; fecha = fecha.toDateString().slice(4, 24);
  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [imgPopUp, setImagenPopUp] = useState(false);

  const { user } = useSelector(store => store)

  const popUpFunction = (specification, bool) => {
    if (specification === "password") setPasswordPopUp(bool);
    else if (specification === "username") setUsernamePopUp(bool);
    else if (specification === "image") setImagenPopUp(bool);
  };
  const coursesAll = user.courses.map((course) => {

    let completados = user.lessons.filter(e => e.isComplete).map(e => e.lesson._id);
    let lessons = course.course.lessons.map(e => e.lesson._id);
    lessons = completados.filter(e => lessons.find(el => el === e))
    return (
      <div className={style.cartYourCourse} key={course.id}>
        <label className={style.cursos}> {course.course.titulo} </label>
        <label className={style.cursos}>
          {course.isFavorite === true ? "SI" : "NO"}
        </label>
        <label className={style.cursos}> {course.course.lessons.length} </label>
        <label className={style.cursos}> {lessons.length} </label>
        <div className={style.lenguaje}>
          <JSIcon lenguajes={course.course.lenguaje.toLowerCase()} />
        </div>
      </div>
    );
  });

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.containerHeader}>
        <div className={style.containerPerfil}>
          <div className={style.perfilDates}>
            <div className={style.containerImg}>
            <img
                  className={style.imgPerfil}
                  src={user.Image}
                  alt="aqui va un imagen"
                  referrerPolicy="no-referrer"
                />
                <button
                  className={style.imgChanger}
                  onClick={() => popUpFunction("image", true)}
                >
                  cambiar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/> </svg>
                </button>
            </div>
            <div className={style.userDetail}>
              <div className={style.userFlex}>
                <div className={style.Username}>
                  <span>{user.username}</span>
                </div>
                <button
                  className={style.popup}
                  onClick={() => popUpFunction("username", true)}
                >
                  Cambiar Nombre
                </button>
                <button
                  className={style.popupPassword}
                  onClick={() => popUpFunction("password", true)}
                >
                  Cambiar Contraseña
                </button>
              </div>
              <div className={style.flex}>
                <div className={style.item}>
                  <div>
                    <label> Name: </label>
                    <span> {user.name} </span>
                  </div>
                  <div>
                    <label> Email: </label>
                    <span> {user.email} </span>
                  </div>
                  <div>
                    <label> IsPremium: </label>
                    <span> {user.isPremium ? "SI" : "NO"} </span>
                  </div>
                </div>
                <div className={style.item}>
                  <div>
                    <label> Ultima Conexion : </label>
                    <span> {fecha} </span>
                  </div>
                  <div><label> Cursos Completados : </label>
                    <span> {user.courses.filter(e => e.completed === true).length} </span>
                  </div>
                  {user.isPremium ? <div>
                    <label> Vencimiento del Plan : </label>
                    <span> {user.Vencimiento? user.Vencimiento.fecha: null} </span>
                  </div> : null}
                </div>

              </div>
            </div>
          </div>

          {/* YOUR_COURSE   */}
          <YourCourse className={style.YourCourse} coursesAll={coursesAll} />

          {/* Condition Open pop up and Close pop up*/}
          {usernamePopUp ? (
            <UsernamePopUp popUpFunction={popUpFunction} id={user._id} />
          ) : null}
          {passwordPopUp ? (
            <PasswordPopUp popUpFunction={popUpFunction} email={user.email} />
          ) : null}
          {imgPopUp ? <ImgPopUp popUpFunction={popUpFunction} id={user._id} />
          :null
          }
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Perfil;
