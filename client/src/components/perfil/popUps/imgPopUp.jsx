
import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { editFoto } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


export default function ImgPopUp({ popUpFunction, id }) {

    const dispatch = useDispatch();

    const [input, setInput] = useState({})
    const [wait, setW] = useState(false)
    const [updateError, setUpdateError] = useState({})

    const workOnChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setW(true)
        const response = await dispatch(editFoto(input.imagen, id))
        if (response.success) {
            setInput({
                ...input,
                success: response.info
            })
            setW(false)
        } else {
            setUpdateError({ err: response.info })
            setW(false)
        }

    }


    return (
        <div className={style.overlay}>
            <div className={style.pop_up}>
                <div className={style.close_and_title}>
                    <a href='#' id="btn_close_popup" className={style.btn_close_popup} onClick={() => popUpFunction("username", false)}><AiFillCloseCircle className={style.icon} /></a>
                    <h2>Cambia tu imagen</h2>
                </div>
                <h4>Introduce la URL de tu nueva imagen </h4>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)} onChange={(e) => workOnChange(e)}>
                    <div className={style.inputs_container}>
                        <input type="url" placeholder="New imagen" name="imagen"></input>
                    </div>
                    {wait?<label className={style.send}>Espera...</label> :input.imagen && input.imagen !== "" && !input.success? <input className={style.send} type="submit" value="Listo"></input>:<></>}
                    {input.success && <label className={style.success}>{input.success}</label>}
                    {updateError.err && <label className={style.error}>{updateError.err}</label>}
                </form>
            </div>
        </div>
    )

}

