import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Premium } from '../../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import style from "./paymentGateway.module.css"

const stripePromise = loadStripe('pk_test_51LFUVvA8axHMWg4IbzM18cLI1cIUBXdzdQXFeuYR8wG3mnRTcazOmb4fS7lmWUYn95D7bRe4uAdDDC4DrxH2vDUK004ZMldw6F');
let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CheckoutForm = ({ user }) => {
    let { Time } = useParams();
    let [respuesta, setRespuesta] = useState({});
    let [wait, setWait] = useState(false)
    let [input, setInput] = useState({ numero: "XXXX XXXX XXXX XXXX", name: null, cvv: 123, email: user.email })
    let stripe = useStripe();
    let elements = useElements();
    const dispatch = useDispatch();
    function Change(e) {
        setInput({ ...input, [e.name]: e.value });
        setRespuesta({})
    }

    async function handleSubmit(e) {
        setWait(true)
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: elements.getElement(CardElement) })
        let date = new Date().toDateString().split(" ");
        let mes = meses.findIndex(e => e === date[1]);
        if (!error) {
            var respuesta = {}
            if (Time === "Year") {
                date = `${date[1]} ${parseInt(date[3]) + 1}`
                const { id } = paymentMethod
                respuesta = await Premium({
                    id,
                    amount: 4200, // 4200/12 Se hace un monto mensual pero con precio anual //USD*100
                    date,
                    description: "Pago por un año",
                    idUser: user._id,
                    correo: input.email, 
                    nombre: input.name, 
                    celular: input.celular
                })(dispatch)
            }
            else {
                if (mes === 11) { date = `${meses[0]} ${1 + parseInt(date[3])}` }
                else { date = `${meses[mes + 1]} ${date[3]}` }
                const { id } = paymentMethod
                respuesta = await Premium({
                    id,
                    amount: 1450,//USD*100
                    date,
                    description: "Pago por un mes",
                    idUser: user._id,
                    correo: input.email, 
                    nombre: input.name, 
                    celular: input.celular
                })(dispatch)
            }
            setRespuesta(respuesta)
            setWait(false)
            return
        }
        else { setRespuesta(error); setWait(false) }
    }
    console.log(respuesta)
    if (respuesta.success) {
        return (<div className={style.body}>
            <img className={style.confeti} src="https://c.tenor.com/v35v-zbtwnUAAAAi/confetti.gif" alt="confeti" />
            <div className={style.recuadro}>
                <div>
                    <h1>Pago exitoso</h1>
                    <label>Tu pago fue confirmado ahora eres Premium.
                        Ya puedes disfrutar de todos tus contenidos.
                    </label>
                    <label>Recuerda que el pago no se debita automaticamente. Y que se vence al iniciar el mes</label>
                    <label>El pago realizado va hasta {user.Vencimiento.fecha}</label>
                    <label>Si presentas cualquier inconveniente comunicate con {import.meta.env.VITE_CORREOSUPORT}</label>
                    <NavLink to="/home">Ir al home</NavLink>
                </div>
                <div>
                    <h2>Informacion de pago:</h2>
                    <h5>Email:{input.email}</h5>
                    <h5>Importe:{Time === "Year" ? "$42 usd" : "$14.5 usd"}</h5>
                    <h5>Telefono de Contacto:{input.celular}</h5>
                    <h5>Nombre:{input.name}</h5>
                </div>
            </div>
        </div>)
    }
    return (
        <form onSubmit={(e) => { handleSubmit(e) }} className={style.body}>

            <label className={style.cerrar}>
                <NavLink to="/home">X</NavLink>
            </label>
            <div className={style.container}>
                <div className={style.card}>
                    {wait ? <button className={style.proceed}><img className={style.load} src="https://acegif.com/wp-content/uploads/loading-6.gif" alt="" /></button> : (input.name && input.email && input.celular) ? <button className={style.proceed}><svg className={style.sendicon} width="24" height="24" viewBox="0 0 24 24" >
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                    </svg></button> : null}
                    <img src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png" className={style.logo_card} />
                    <img src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png" className={style.logo_card} />
                    <img src="https://1000marcas.net/wp-content/uploads/2020/03/logo-American-Express.png" className={style.logo_card} />
                    <img src="https://lirp.cdn-website.com/876572b9/dms3rep/multi/opt/Dekart+favicon-1920w.png" className={style.chip_card} />
                    <label>Card number:</label>
                    <input id="user" className={style.input_cardnumber} placeholder="1234 5678 9101 1121" readOnly />
                    <div>
                        <label>Name:</label>
                        <label className={style.name} placeholder="XXXXXXXXX XXXXXX" readOnly>{input.name}</label></div>
                    <div><label className={style.toleft} readOnly>CCV:</label>
                        <input className={style.toleft_ccv} placeholder="XXX" disabled value={input.cvv} /></div>
                </div>
                <div className={style.receipt} >

                    <p className={style.titulo}>Completa los siguientes campos:</p>
                    <p className={style.comprobe}>4242424242424242 Pago Realizado</p>
                    <p className={style.comprobe}>4000000000009995 Error en el pago</p>
                    {respuesta.message ? <div className={style.error}>{respuesta.message}</div> : null}
                    <div className={style.col}><p>Cost:</p>
                        <h2 className={style.seller}>{Time === "Year" ? "$42 usd" : "$14.5 usd"}</h2><br />
                        <p>Name:</p>
                        <h2 className={style.seller}>CodeLine</h2>
                    </div>
                    <div className={style.col} >
                        <p>Numero de Tarjeta:</p>
                        <CardElement className={style.tarjeta} id="Tarjeta" />
                        <p>Nombre que figura en la tajeta:</p>
                        <input className={style.input} placeholder="Nombre..." name="name" onChange={(e) => Change(e.target)} />
                        <p>Correo Electronico:</p>
                        <input className={style.input} placeholder="Email..." name="email" onChange={(e) => Change(e.target)} defaultValue={user.email} />
                        <p>Numero de telefono:</p>
                        <input className={style.input} name="celular" onChange={(e) => Change(e.target)} />
                    </div>
                    <div className={style.abajo}>
                        <p className={style.comprobe}>This information will be sended to your email</p>
                        {(input.name && input.email && (input.celular && input.celular.length >= 8)) ? <button className={style.proceed3}>{wait ? "Loading..." : "Pagar"}</button> : null}
                    </div>

                </div>
            </div>
        </form>)
}

export default function App() {
    const { user } = useSelector((store) => store);
    const { type } = useParams();
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm user={user} type={type} />
        </Elements>
    );
};