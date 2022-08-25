const Curso = require('../model/modelCurso')
const User = require('../model/modelUser')
const Lesson = require('../model/modelLesson')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create(req.body)
    const curso = await Curso.findByIdAndUpdate(req.params.id, {
      $push: { lessons: newLesson }
    })
    if (curso.lessons[0] === newLesson) {
      curso.lessons[0].isLocked = false
    }
    const all = await Curso.find()
    res.send({ info: 'Curso creado exitosamente', all })
  } catch (err) {
    next(new ErrorResponse(err, 500))
  }
}
const getLesson = async (req, res, next) => {
  let { id, num } = req.params
  try {
    const CursoFind = await Curso.find({ _id: id })
    var lesson2 = CursoFind[0].lessons.filter(e => e.lesson && e.lesson.num + "" === num)
    res.send({ info: 'Clase obtenida correctamente', lesson2 })
  } catch (err) {
    console.log(err)
    next(new ErrorResponse('Error al obtener la clase', 500))
  }
}
const isCompleted = async (req, res) => {
  const { idLesson, idUser, num, idNext } = req.body
  try {
    const usuario = await User.findById({ _id: idUser });
    let filter = usuario.lessons.filter(e => e.lesson !== null)
    let find = filter.length ? filter.find(e => e.lesson.num === num && e.lesson._id === idLesson) : null;
    if (find) {

      let correccion = filter.map((e, i) => {
        if (e.lesson.num === num  && e.lesson._id === idLesson) {
          e.isComplete = true;
          e.isLocked = false;
          return e
        }
        if (e.lesson.num === num + 1) { e.isLocked = false; return e }
        return e
      })
      var user = await User.findByIdAndUpdate(
        { _id: idUser },
        { lessons: correccion },
        { new: true }
      );
      let Lewlesson = await Lesson.find({ num: num + 1, _id: idNext })
      let find2 = filter.length ? filter.find(e => e.lesson.num === num + 1 && e.lesson._id === idNext) : null;
      if (Lewlesson.length && !find2) {
        user = await User.findByIdAndUpdate(
          { _id: idUser },
          {
            $push: {
              lessons: {
                lesson: { _id: idNext },
                isLocked: false,
              }
            }
          },
          { new: true }
        );
      }
      res.send({ info: "Lesson modificado exitosamente", user, success: true }).end();
    }
    if (!find) {
      var user = await User.findByIdAndUpdate(
        { _id: idUser },
        {
          $push: {
            lessons: {
              lesson: { _id: idLesson },
              isComplete: true,
              isLocked: false,
            }
          }
        },
        { new: true }
      );
      let lesson2 = await Lesson.find({ _id:idNext })
      if (lesson2.length) {
        user = await User.findByIdAndUpdate(
          { _id: idUser },
          {
            $push: {
              lessons: {
                lesson: { _id: lesson2[0]._id },
                isLocked: false,
              }
            }
          },
          { new: true }
        );
      }
      res.send({ info: "Lesson añadido y modificada exitosamente", user, success: true });
    }


  } catch (err) {
    console.log(err)
    next(new ErrorResponse("Error al añadir el complete", 500, false));
  }
}

module.exports = {
  createLesson,
  getLesson,
  isCompleted
}