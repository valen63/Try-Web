const Stripe = require('stripe');
const User = require("../model/modelUser.js");
const { Premium } = require("../utils/sendEmail.js")

let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const payStripe = async (req, res) => {
  const { idUser, amount, id, fecha, description, correo, nombre, celular } = req.body;
  let fecha2 = fecha
  var user = await User.findById(idUser).catch(() => res.status(500).send({ message: "Usuario invalido", success: false }).send())
  try {
    let date = new Date().toString().split(" ");
    let fecha = user.Vencimiento && user.Vencimiento.fecha ? user.Vencimiento.fecha.split(" ") : null;
    if (user.isPremium) {
      if (fecha && (fecha[1] > date[3] || meses.indexOf(fecha[0]) > meses.indexOf(date[1]))) {
        res.status(404).send({ message: "Ya eres Premium, y no se ha vencido tu ultimo pago, tu proximo pago es el :" + user.Vencimiento.fecha, success: false }).end()
        return
      }
      await User.findByIdAndUpdate(idUser, {
        isPremium: false,
        Vencimiento: null
      }, { new: true }
      )
    }
    const stripe = new Stripe(process.env.STRIPE_KEY)
    let payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      payment_method: id,
      confirm: true
    }).catch((err) => res.status(500).send({ message: err.raw.message, success: false }).end())
    if (payment.status === "succeeded") {
      Premium(correo, amount/100 + "USD", fecha2, nombre, celular)
      var type = "Mes"
      if (amount === 4200) { type = "Año" }
      var user = await User.findByIdAndUpdate(idUser, {
        isPremium: true,
        Vencimiento: { fecha: fecha2, type }
      }, { new: true })
      res.send({ message: "Genial, tu compra ha sido procesada correctamente", success: true, user, payment }).end()
      return
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ success: false })
  }
};
module.exports = { payStripe };
