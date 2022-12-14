import { useState, useEffect } from "react";

// style
import style from "./questionsPage.module.css";

export default function QuiztCart({ questions, handleApproved, approved }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  const constApproved = questions.length * 0.5;

  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta

    setTimeout(() => {
      if (preguntaActual === questions.length - 1) {
        setIsFinished(true);
        if (((puntuación * 100) / questions.length) > constApproved)
          handleApproved(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(60);
      }
    }, 1000);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className={style.quiz}>
        <div className={style.juegoterminado}>
          <span>{approved ? "Is approved" : "Not approved"}</span>
          <span>
            {" "}
            Obtuviste {puntuación} de {questions.length}{" "}
          </span>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
            className={style.button}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className={style.quiz}>
        <div className={style.ladocomplete}>
          <div className={style.numero}>
            <span> Pregunta {preguntaActual + 1} de {questions.length}</span>
          </div>
          <div className={style.titulo}>
            {questions[preguntaActual].titulo}
          </div>
          <div>
            {
              questions[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            className={style.button}
            onClick={() => {
              if (preguntaActual === questions.length - 1) {
                setPreguntaActual(0);
                setPuntuación(0);
                setIsFinished(false); setTiempoRestante(60); setAreDisabled(false);
                setAnswersShown(false); handleApproved(false)

              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === questions.length - 1
              ? "Volver a intentar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <main className={style.quiz}>
      <div className={style.lado}>
        <div className={style.numero}>
          <span> Pregunta {preguntaActual + 1} de {questions.length}</span>
        </div>
        <div className={style.titulo}>
          {questions[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className={style.tiempo}>
              Tiempo restante: {tiempoRestante}{" "}
            </span>
          ) : (
            <button
              className={style.botoncont}
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === questions.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className={style.lado}>
        {questions[preguntaActual].opciones.map((respuesta) => ( //.sort(()=> Math.round(Math.random()*2)-1)
          <button
            className={style.button}
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}
