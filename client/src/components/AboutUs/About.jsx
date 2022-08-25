import { useState } from "react";
import { NavLink } from "react-router-dom";
import { contactar } from "../../../redux/actions";
import CodeIcon from "../../icons/code";
import Discord from "../../icons/Discord";
import Home from "../../icons/Home";
import CursoIcon from "../../icons/libro";
import Moon from "../../icons/moon";
import Notification from "../../icons/notification";
import Sun from "../../icons/sun";
import Foot from "../Foot/Foot";
import style from "./about.module.css";

const Colaboradores = [{ name: "Cesar", git: "https://github.com/cfremoto", foto: "https://avatars.githubusercontent.com/u/48156077?v=4" }, { name: "Agustin", git: "https://github.com/Agus1510", link: "https://www.linkedin.com/in/agustin-panizza/", foto: "https://avatars.githubusercontent.com/u/50965316?v=4" }, { name: "Valentina Colmenares", git: "https://github.com/valen63", link: "https://www.linkedin.com/in/valentinacolmenaressuarezdeveloper/", foto: "https://avatars.githubusercontent.com/u/89048062?v=4" }, { name: "Homero", git: "https://github.com/ChampiMagic", foto: "https://avatars.githubusercontent.com/u/97173716?v=4" }, { name: "Johan", git: "https://github.com/KraosFex", foto: "https://avatars.githubusercontent.com/u/86781666?v=4" }]

export default function About() {
    var [input, setInput] = useState({})
    function Changes(e) {
        setInput({ ...input, [e.name]: e.value })
    }
    function Send(e) {
        e.preventDefault();
        contactar(input)()
    }
    return (<div className={style.continer}>

        <scroll-container>
            <scroll-page id="page-0">
                <div className={style.head}><h2>AboutUs</h2><nav>
                    <a href="#page-1">¿Que hacemos?</a>
                    <a href="#page-2">Ser Premium</a>
                    <a href="#page-3">Colaboradores</a>
                    <a href="#page-4">¿Como moverme en la pagina?</a>
                    <a href="#page-5">Contacto</a>
                </nav><NavLink to="/Home"><Home /></NavLink></div>
            </scroll-page>
            <scroll-page id="page-1">
                <div className={style.contenedor1}>
                    <h1>¿Que hacemos?</h1>
                    <p>Nuestro objetivo principal es fomentar la cultura del mundo TI e interesar tanto a niños como adolescente en el desarrollo web. Buscamos crear un entorno educativo digital donde nuestros usuarios puedan familiarizarse con la lógica de programación y en el cual los mismos aprendan los fundamentos básicos sobre la creación de sitios web.

                        Nuestro proyecto busca motivar a sus usuarios mediante el uso de herramientas interactivas y didácticas que vuelvan el flujo de aprendizaje más entretenido, y a través de la implementación de un ecosistema de competencia sana (Sistema de Rankings) que logren que nuestros clientes si automotiven a superar/completar cursos con el fin de tener un puesto más elevado en la competición.</p>
                </div>
            </scroll-page>
            <scroll-page id="page-2">
                <div className={style.contenedor2}>
                    <a className={style.up} href="#page-0"><img src="https://cdn-icons-png.flaticon.com/512/156/156271.png" alt="up" /></a>

                    <p>
                        Actualmente CodeLearn tiene cursos con varias lecciones, con un sistema de leccion uno a uno, es decir, para poder acceder a la leccion 2 debes completar la leccion 1.Ser Premium es tener la ventaja de poder desbloquear todas las LECCIONES de los  TODOS los cursos inmediatamente sin tener que estar resolviendo cada ejercicio individualmente para desbloquear el siguiente. Luego de efectuar la compra, puedes ver los cursos sin ningun tipo de incoveniente y las lecciones en el orden que prefieras. Para personas que se estancan en un ejercicio es la solucion. Puedes omitir las lecciones que tampoco quieras y ver las que realmente te interesen.
                    </p>
                    <h1>¿Que es ser Premium?</h1>
                </div>
            </scroll-page>
            <scroll-page id="page-3">
                <div className={style.contenedor3}>
                    <a className={style.up} href="#page-0"><img src="https://cdn-icons-png.flaticon.com/512/156/156271.png" alt="up" /></a>
                    <h1>¿Quienes somos?</h1>
                    <p>Somos un grupo de desarrolladores Full Stack graduados de SoyHenry.</p>
                    <div className={style.cards}>{Colaboradores.map(e =>
                        <div className={style.card}>
                            <h1>{e.name.toUpperCase()}</h1>
                            <label>Full Stack Developer</label>
                            <img src={e.foto} alt={e.name} className={style.foto} />
                            <div>
                                {e.link ? <a href={e.link}><img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" className={style.url} alt="Linkedin" /></a> : null}
                                <a href={e.git}><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className={style.url} alt="GitHub" /></a>
                            </div>
                        </div>
                    )}</div>
                </div>
            </scroll-page>
            <scroll-page id="page-4">
                <div className={style.contenedor2}>
                    <a className={style.up} href="#page-0"><img src="https://cdn-icons-png.flaticon.com/512/156/156271.png" alt="up" /></a>
                    <p>
                        Los iconos que te puedes topar son:
                        <label> </label>
                        <ul><li className={style.icon}><Home /> Ir a la pagina principal</li><li className={style.icon}><CursoIcon /> Ver todos los cursos existentes, filtarlos, y añadir a favoritos</li><li className={style.icon}><CodeIcon />Ver tus cursos favoritos o completos(No valido para invitados)</li><li className={style.icon}><Discord />Link directo a nuestro canal de discord(Por si necesitas ayuda)</li><li className={style.icon}><Moon />/<Sun />Cambiar el modo a Nocturno/Diurno</li><li className={style.icon}><Notification />Acceso rapido a tu perfil (Editar nombre, contraseña o imagen de perfil)</li>
                        </ul>
                        <li className={style.icon}>Los puedes encontrar en:Tu Barra de navegacion ó tu barra lateral.(Ambos disponibles en a mayoria de las entradas)</li>
                        Pagina de cursos:
                        <li className={style.icon}>En la pagina de cursos puedes acceder a los cursos disponibles. Para acceder a un curso da click en su nombre. Una vez que tengas el detalle del curso, veras toda su informacion,si lo añades a tus cursos (opcion para Registrados) podras ver cuantas lecciones tiene, votar como te parecio el curso (Por unica vez), y un mini resumen de la leccion que vas a ver.</li>
                        <li className={style.icon}>Si ves el detalle de la leccion(opcion para Registrados) aparecera un boton que dice "Ver clase", para acceder a la leccion. Tendras el video asociado, y un quiz temporizado que inicia cuando le hagas click en "Empezar Leccion"</li>
                        IMPORTANTE PARA LAS LECCIONES:
                        <li className={style.icon}>Todas las lecciones se guardan en tu usuario UNICAMENTE luego de que le des click a "Siguiente Leccion" ó "Terminar Curso".Puedes salir luego sin iniciar la siguiente leccion, pero no olvides hacer click o tu progreso no se actualizara.</li>
                        Recomendaciones:
                        <li className={style.icon}>Sabemos que la mejor fomra de aprender aveces es jugando asi que las recomenciones son links a paginas EXTERNAS A NOSOTROS que pueden contribuir a tus aprendizajes</li>
                    </p>
                    <h1>¿Como moverte en la pagina?</h1>
                </div>
            </scroll-page>
            <scroll-page id="page-5">
                <div className={style.zona}><div class="frame">
                    <div class="circle"></div>
                    <div class="line left"></div>
                    <div class="line right"></div>
                    <div class="bracket left"></div>
                    <div class="bracket right"></div>
                    <div class="small top"><span class="first-letter">c</span>ollect</div>
                    <div class="big">Moments</div>
                    <div class="small bottom">Not <span class="first-letter">T</span>hings</div>
                    <div class="hide top"></div>
                    <div class="hide bottom"></div>
                </div>
                    <form className={style.form} onSubmit={(e) => Send(e)} onChange={(e) => Changes(e.target)}>
                        <h1>Contacto</h1>
                        <a className={style.up} href="#page-0"><img src="https://cdn-icons-png.flaticon.com/512/156/156271.png" alt="up" /></a>
                        <label className={style.label}>Nombre*:<input name="name"  placeholder="Es requerido..." /></label>
                        <label className={style.label}>Correo*:<input type="email" name="correo" placeholder="Es requerido..." /></label>
                        <label className={style.label}>Mensaje*:<textarea className={style.texto} name="text" placeholder="Es requerido..." /></label>
                        {input.name && input.correo && input.text ? <button className={style.Send}>Send</button> : null}
                    </form>
                </div>
            </scroll-page>
        </scroll-container>
        <Foot estilo="complete" />
    </div>)
}