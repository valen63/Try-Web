import React from "react";
import darkTheme from "./homeDark.module.css";
import lightTheme from "./homeLight.module.css";
import { ThemeProvider } from "styled-components";
import codeLearnGold from "../../icons/codelearngold.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Ranking from "./ranking/ranking";
import UserRank from "./userRank/userRank";
import JSIcon from "../../icons/javascript";
import { AiFillHeart } from 'react-icons/ai';
import "../../EstilosRecos.css"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Foot from "../Foot/Foot";

let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function Recomendaciones(name, hr, etiqueta, style, key) {
  var etiquet = ""
  if (etiqueta.toLowerCase() === "css") { etiquet = <label className="css">{etiqueta.toUpperCase()}</label> }
  if (etiqueta.toLowerCase() === "javascript") { etiquet = <label className="js">{etiqueta.toUpperCase()}</label> }
  if (etiqueta.toLowerCase() === "html") { etiquet = <label className="html">{etiqueta.toUpperCase()}</label> }
  else { etiquet === null }
  return (<div key={key} className={style.recos}><h2>{name.toUpperCase()}</h2>{etiquet}<a target="_blank" rel="noopener noreferrer" href={hr}>Go Now!</a></div>)
}

function Home(props) {
  const [mensaje, setMensaje] = useState(true);
  let dis = useDispatch();
  const { courses, user, Recos, anuncios  } = useSelector((store) => store);
  let favoritos = user.courses ? user.courses.filter(e => e.isFavorite).map(e => e.course) : []
  let fecha = user.Vencimiento && user.Vencimiento.fecha ? user.Vencimiento.fecha.split(" ") : null;
  let date = new Date().toString().split(" ");
  let style = props;
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.container}>
          <UserRank />
          <Ranking />
        </div>
        {anuncios && mensaje && user.isPremium && fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1])) ?
          <div className={style.aviso}>Recuerda que eres Premium, asi que todas las clases tienen sus lecciones desbloquedas!. El equipo de CodeLearn te agradece por tu compra y te quiere recordar que lo feliz que nos hace que hagas parte de esta familia.Ante cualquier inconveniente comunicate con el correo:  {import.meta.env.VITE_CORREOSUPORT}
            <button className={lightTheme.cerrar} onClick={() => {setMensaje(false);dis({type:"ANUNCIO",payload: false})}}>X</button>
          </div>
          :anuncios && mensaje? <div className={style.aviso}>Aun no eres Premium, ¿que esperas para pasarte?. 
          ¡COMPRA HOY!.
          Recuerda que siendo premium puedes acceder a todos los cursos y todas las lecciones que aun tiene bloqueadas
          <button className={lightTheme.cerrar} onClick={() => {setMensaje(false)}}>X</button>
        </div>:null}
        <div className={style.flexContainer2}>
          <div className={style.container2}>
            <h1>Recomendaciones del mes:</h1>
            {Recos.length ? Recos.map((e, i) => Recomendaciones(e.name, e.hr, e.etiqueta, lightTheme, i)) : null}
          </div>
          <div className={style.flexContainer3}>
            <div className={style.container31}>
              <img src={codeLearnGold} className={style.logoCont3} />
              {user.isPremium && fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1])) ? <div className={style.container3Text}>
                <h3>Ya eres CodeLearn Gold!</h3>
                <h1>
                  Recuerda que tienes acceso a todos las lecciones de los cursos sin tener que desbloquear una a una.Ve a los cursos y aprovecha tu compra!
                </h1>
                <div className={style.button}>
                  <Link to="/courses">Ir ahora</Link>
                </div>
              </div> : <div className={style.container3Text}>
                <h3>Mejora a CodeLearn Gold ahora!</h3>
                <h1>
                  Vuelvete Premium y accede a todas las lecciones y clases sin tener que desbloquearlas individualmente
                </h1>
                <div className={style.button}>
                  <Link to="/Precios">Ver mas</Link>
                </div>
              </div>}
            </div>
            <div>
              {favoritos.length ? <h1 className={style.tit}>Favoritos</h1> : null}
              {favoritos ? favoritos.map((course, i) => <div key={i} className={style.container3}>

                <div className={style.flexContainerCard}>
                  <NavLink
                    to={`/course/${course._id}`}
                    className={style.courseName}
                  >
                    {course.titulo.toUpperCase()}
                  </NavLink>

                  <div className={darkTheme.lenguaje}>
                    <JSIcon lenguajes={course.lenguaje.toLowerCase()} />
                  </div>
                  <div className={style.courseStats}>
                    <AiFillHeart className={darkTheme.corazon} />
                    <span>Rating: {course.votes.length > 0 ? (course.votes.reduce((a, b) => a + b, 0) / course.userVotes.length).toFixed(1) : 0}</span>
                    <div className={style.descripcion}>
                      <span>Descripcion: {course.descripcion.slice(0, 150)}{course.descripcion.slice(150, 151) ? <NavLink to={`/course/${course._id}`} className={style.mas}>(...)</NavLink> : null}</span>
                    </div>
                  </div>

                  <div></div></div>
              </div>).slice(0, 2) : null}
              {courses.length ? <h1 className={style.tit}>Mas Votados</h1> : null}
              {courses ? courses.sort((a, b) => (a.votes.length > 0 ? (a.votes.reduce((a1, b1) => a1 + b1, 0) / a.userVotes.length).toFixed(1) : 0) < (b.votes.length > 0 ? (b.votes.reduce((a1, b1) => a1 + b1, 0) / b.userVotes.length).toFixed(1) : 0) ? 1 : -1).slice(0, 2).map((course, i) =>
                <div key={i} className={style.container3}>

                  <div className={style.flexContainerCard}>
                    <NavLink
                      to={`/course/${course._id}`}
                      className={style.courseName}
                    >
                      {course.titulo.toUpperCase()}
                    </NavLink>
                    <div className={darkTheme.lenguaje}>
                      <JSIcon lenguajes={course.lenguaje.toLowerCase()} />
                    </div>
                    <div className={style.courseStats}>
                      <span>Rating: {course.votes.length > 0 ? (course.votes.reduce((a, b) => a + b, 0) / course.userVotes.length).toFixed(1) : 0}</span>
                      <div className={style.descripcion}>
                        <span>Descripcion: {course.descripcion.slice(0, 150)}{course.descripcion.slice(150, 151) ? <NavLink to={`/course/${course._id}`} className={style.mas}>(...)</NavLink> : null}</span>
                      </div>
                    </div>

                    <div></div></div>
                </div>) : null}
            </div>
          </div>
        </div>
        <Foot/>
      </div>
    </ThemeProvider>
  );
}

export default Home;
