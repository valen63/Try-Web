import { NavLink } from "react-router-dom";
import style from "./Foot.module.css"
export default function Foot({estilo}) {
    return (
        <div className={estilo? style.All2: style.All}>
            <div className={style.Info}>
                <h3>CODE<span>LEARN</span></h3>
                <div>
                    <NavLink to="/Home">Home </NavLink>| <NavLink to="/Courses">Cursos </NavLink> | <NavLink to="/Contacto">Contacto </NavLink>
                </div>
                <label>{import.meta.env.VITE_CORREOSUPORT}</label>
                <p class={style.soyh}>Soy Henry Bootcamp © 2022</p>
            </div>
            <img src="https://cdn.pixabay.com/photo/2021/03/27/06/31/code-6127616_960_720.png" className={style.imagen} />

            <div className={style.Us}>
                <p>
                    <span>EQUIPO DE DESARROLLO</span>
                    Somos un grupo de desarrolladores Full Stack graduados de SoyHenry. Conoce mas sobre nosotros y nuestros proyectos...
                    <span className={style.flec}>↓</span>
                </p>
                <NavLink to="/AboutUs" className={style.Footer}><div className={style.button}>
                    <div className={style.box}>H</div>
                    <div className={style.box}>E</div>
                    <div className={style.box}>L</div>
                    <div className={style.box}>L</div>
                    <div className={style.box}>O</div>
                </div></NavLink>
            </div>
        </div>)
}