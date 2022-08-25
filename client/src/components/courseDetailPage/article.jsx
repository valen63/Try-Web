// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// hardDate
import Stars from "./Vote/Vote";
import { Añadir } from "../../../redux/actions";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./course/courseDark.module.css";
import lightTheme from "./course/courseLight.module.css";
import LessonSumary from "./course/lessonSumary/lessonSumary";
import NotFound from "../../NotFound/NotFound";
import { NavLink } from "react-router-dom";
let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export default function CardD(props) {
  const [idClase, setIdClase] = useState({ num: 0, state: "Disponible" });
  const [mensaje, setMensaje] = useState(true);
  let { detail, user,anuncios } = useSelector(state => state)
  let dis = useDispatch();
  let Curso = detail;
  let ids = user.lessons ? user.lessons.map(e => e.lesson._id) : []
  let claseSumary = user.courses ? user.courses.find((o) => o.course._id === detail._id) : null;
  claseSumary = claseSumary ? claseSumary.course : null
  let style = darkTheme;
  let fecha = user.Vencimiento && user.Vencimiento.fecha ? user.Vencimiento.fecha.split(" ") : null;
  let date = new Date().toString().split(" ");
  if (!detail.titulo) { return <NotFound /> }
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.Container}>
          <div className={style.flexContainer2}>
            <div className={lightTheme.botoncito}>
              <h1 className={style.titulo}>{Curso.titulo.toUpperCase()}</h1>
              {user.courses ? claseSumary ? null : <button onClick={() => Añadir(user._id, detail._id)(props.dispatch)}>Añadir curso +</button> : <NavLink to="/login">Añadir curso +</NavLink>}
            </div>
            <div className={style.data}>
              <label className={style.label}>
                Numero de clases: {Curso.lessons.length}
              </label>
              <label className={style.label}>
                Clasificacion: {Curso.votes.length > 0 ? (Curso.votes.reduce((a, b) => a + b, 0) / Curso.userVotes.length).toFixed(1) : 0}
              </label>
              <label className={style.label}>
                Numero de votos: {Curso.userVotes.length}
              </label>
              <Stars idCurso={detail._id} idUser={user._id} calificacion={detail.calificacion} userVotes={detail.userVotes} />
            </div>
            <img className={style.imagen} alt="" src={Curso.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p>{Curso.descripcion}</p>
            </div>
            {claseSumary ? claseSumary.lessons.length === 0 ? null : <div className={darkTheme.flexContainer4}>
              {anuncios && mensaje && user.isPremium && fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1])) ?
                <div className={style.aviso}>Recuerda que eres Premium, asi que todas las clases tienen sus lecciones desbloquedas!. El equipo de CodeLearn te agradece por tu compra y te quiere recordar que lo feliz que nos hace que hagas parte de esta familia.Ante cualquier inconveniente comunicate con el correo:  {import.meta.env.VITE_CORREOSUPORT}
                  <button className={lightTheme.cerrar} onClick={() => { setMensaje(false); dis({ type: "ANUNCIO", payload: false }) }}>X</button>
                </div>
                : anuncios && mensaje ? <div className={style.aviso}>Aun no eres Premium, ¿que esperas para pasarte?.
                  ¡COMPRA HOY!.
                  Recuerda que siendo premium puedes acceder a todos los cursos y todas las lecciones que aun tiene bloqueadas
                  <button className={lightTheme.cerrar} onClick={() => { setMensaje(false) }}>X</button>
                </div> : null}
              <div className={style.flexContainer5}>
                <div className={darkTheme.progreso}>
                  {claseSumary.lessons.sort((a, b) => a.lesson.num > b.lesson.num ? 1 : -1).map((e, i) => {
                    let complete = false
                    let lock = true
                    if (ids.find((ele, index) => ele === e.lesson._id && !user.lessons[index].isLocked)) { ; lock = false }
                    if (ids.find((ele, index) => ele === e.lesson._id && user.lessons[index].isComplete)) { ; complete = true }
                    if (i === 0) { ; lock = false }
                    if (user.isPremium && fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1]))) { ; lock = false }
                    return (
                      <div className={style.ClasP} key={i}>
                        {complete ? (
                          <>
                            <div className={style.input}>
                              <input readOnly checked type="radio" name={"completada" + i} key={e.id} onClick={() => setIdClase({ num: i, state: "Completa" })} />
                            </div>
                            <p>Completada</p></>

                        ) : lock ? (
                          <>
                            <div className={style.input}>
                              <input disabled type="radio" name="complbloqueada" key={e.id} className={style.locked} />
                            </div>
                            <p>Bloqueada</p></>
                        ) : (
                          <>
                            <div className={style.input}>
                              <input defaultChecked={false} type="radio" name="disponible" key={e.id} onClick={() => setIdClase({ num: i, state: "Disponible" })} />
                            </div>
                            <p>Disponible</p></>
                        )}
                      </div>
                    )
                  })}

                </div>
              </div>
              {claseSumary ? claseSumary.lessons.length !== 0 ? <div className={style.lessonSumary}>
                <LessonSumary clase={claseSumary} num={idClase.num} state={idClase.state} idCurse={detail._id} />
                <hr />
              </div> : null : null}
            </div> : null}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
