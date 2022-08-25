
import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import "./prices.css"

let productos = [
    // { name: "Donar", img: "https://www.nicepng.com/png/full/218-2186702_related-wallpapers-software-de-programacion-png.png", price: [1, "00", " $USD",], clase: "cardd", link: "/Donacion" },
    { name: "Desbloquear Todos los cursos", img: "https://www.nicepng.com/png/full/218-2186702_related-wallpapers-software-de-programacion-png.png", price: [14, 50, " $USD /Mes",], clase: "cardd", link: "/pagar/Mes" },
    { name: "Desbloquear Todos los cursos", img: "https://sites.google.com/site/profeappinventor/_/rsrc/1511509657092/la-programacion-hoy-dia/leng4.png", price: [40, "00", " $USD /Anual",], clase: "cardd best", link: "/pagar/Year" }]
export default function Prices() {
    let date = new Date().toString().split(" ")
    let theme = useSelector(state => state.theme)
    let [aviso, setaviso] = useState(true)
    return (<div className={theme === "light" ? "body" : "body2"}>
        {aviso ? <div className={theme === "light" ? "AvisoL" : "AvisoD"}>
            <button className="cerrarav" onClick={() => setaviso(false)}>X</button>
            Bienvenvendio a nuetra lista de productos.Antes de empezar con tu pago ten en cuenta algunas recomendaciones:
            <li>Recuerde que el pago por un mes es valido del primero del mes vigente hasta el primero del mes siguiente</li>
            <li>Recuerde que el pago no sera de renovacion automatica</li>
            <li>Recuerde que si ya es Premium y quiere cambiar de plan, debe esperar a que se el ultimo pago que realizo de venza</li>
        </div> : null}
        {aviso && date[2] > 15 ? <div className={theme === "light" ? "AvisoL" : "AvisoD"}>
            <button className="cerrarav" onClick={() => setaviso(false)}>X</button>
            Hoy es {date[2]} de {date[1]} .SI COMPRA EL PLAN MENSUAL LE AVISAMOS QUE ESTA POR FINALIZAR EL MES Y QUE RECUERDE QUE SE COBRA DE PRIMERO DE MES A PRIMERO DE MES
        </div> : null}
        <div className="back">
            <NavLink to={"/Home"}>Cancelar</NavLink>
        </div>

        <div className="Contenedorprecios">{productos.map((e, i) =>
            <div className={e.clase} key={i}>
                <div className="imgBox">
                    <img src={e.img} alt="" className="mouse" />
                </div>
                <div className="contentBox">
                    <h3>{e.name}</h3>
                    <h2 className="price">{e.price[0]}.<small>{e.price[1]}</small>{e.price[2]}</h2>
                    <NavLink to={e.link} className="buy">Buy Now</NavLink>
                </div>
            </div>

        )}</div>
    </div>)
}
