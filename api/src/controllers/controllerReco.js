const Recomendacion = require("../model/modelRecomendaciones.js");

const getRecos = async (req, res) => {
    try {
        const courses = await Recomendacion.find()
        let array = courses.reverse().splice(0, 15)
        res.send(array)
    } catch (err) {
        next(new ErrorResponse("Error al buscar las recomendaciones", 500, false));
    }
};
const CreateRecos = async (req, res) => {

    const { body } = req.body;
    try {
        const find = await Recomendacion.find({ name: body.name })
        if (find.length) { res.send("Ya existia esta Recomendacion").end(); return }
        else {
            const courses = await Recomendacion.create(body)
            res.send(courses)
        }

    } catch (err) {
        console.log(err)
        next(new ErrorResponse("Error al crear la recomendacion", 500, false));
    }

};
module.exports = { getRecos, CreateRecos };
