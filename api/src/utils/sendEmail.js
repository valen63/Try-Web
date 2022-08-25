'use strict'
const nodemailer = require('nodemailer');
require('dotenv').config();
this.Bienvenida = (pnombre, correo = "valentina@gmail.com") => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let mail_options = {
        from: `"Bienvenida" <${process.env.MAIL_USERNAME}>`,
        to: correo,
        subject: 'CodeLearn: Bienvenido a la aplicación',
        html: ` <table border="0" cellpadding="0" cellspacing="0" style="width: 100%" width="100%">
        <tr>
            <td bgcolor="#000d32f2" style="background: linear-gradient(to right, #0f0c29, #302b63, #24243e);padding: 20px 100px;">
                <table class="table" border="0" cellpadding="0" cellspacing="0" style="width: 100%" width="100%"
                    align="right">
                    <tr>
                        <td class="cell" style="padding-left: 10px">
    
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 100% !important;min-height: 400px;"
                                width="100%">
    
                                <td style="padding: 0px 0px 10px 0px">
                                    <div style="text-align: -webkit-center;">
                                        <img alt="Hawaii" src="https://www.pngmart.com/files/3/Welcome-PNG-File.png"
                                            style="display: block; height: auto" width="404" />
                                    </div>
                                </td>
    
                                <tr>
                                    <td style="padding: 0px 0px 10px 0px">
                                        <div
                                            style="font-family: Tahoma, Geneva, sans-serif;font-size: 14px; color:#ffffff;font-style: normal;font-weight: normal;text-align: center;font-weight: bold;">
                                            Bienvenido a nuestra aplicacion: ${pnombre}. Estamos muy contentos de
                                            tenerte en nuestra familia CodeLearn. Asi que recibe este correo de
                                            bienvenida de parte de nuestro equipo y inicia hoy a realizar todos tus
                                            cursos.
                                        </div>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="padding: 0px 0px 20px 0px">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            style="text-align: center; margin-left: auto; margin-right: auto">
                                            <tr>
                                                <td align="center" bgcolor="#2181A5"
                                                    style="background-color: #16a3c3;padding: 10px 40px;border-radius: 10px;-webkit-border-radius: 10px;-moz-border-radius: 10px">
                                                    <a href=${process.env.FRONT_URL}
                                                        style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px; color: #FFFFFF; font-style: normal; text-align: center; text-decoration: none"><span
                                                            style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px; color: #FFFFFF; font-style: normal; text-align: center; text-decoration: none">EXPLORE</span></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="padding: 0px 0px 10px 0px">
                                        <div
                                            style="font-family: Tahoma, Geneva, sans-serif;font-size: 14px; color:#ffffff;font-style: normal;font-weight: normal;text-align: center;font-style: italic;">
                                            Recuerda que para contactarnos puedes enviar un correo a: ${process.env.MAIL_USERNAME}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
    };
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo para "Bienvenida" se envío correctamente ' + info.response);
        }
    });
};
this.Password = (link, correo = "valentina@gmail.com") => {
    let transporter2 = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let mail_options = {
        from: `"Forget Password" <${process.env.MAIL_USERNAME}>`,
        to: correo,
        subject: 'CodeLearn: Restablece tu contraseña',
        html: `<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;    min-height: 550px;" width="100%">
        <tr>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@300&display=swap" rel="stylesheet">
            <td bgcolor="#1e0030f2"
                style="    background: linear-gradient(to right, #4b1c74, #3805a1);padding: 20px 100px;font-family: cursive;">
                <table class="table" border="0" cellpadding="0" cellspacing="0" style="width: 100%" width="100%"
                    align="right">
                    <tr>
                        <td class="cell" style="padding-left: 10px">

                            <table border="0" cellpadding="0" cellspacing="0" style="width: 100% !important;"
                                width="100%">
                                <h2
                                    style="font-family: cursive;color:#ffe000;text-align: center;font-weight: bold;font-size: 40px;">
                                    ¿Olvidaste tu contraseña?
                                </h2>
                                <div style="    text-align: center;">
                                    <img alt="Hawaii" src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"
                                        style="max-height: 200px" width="auto" />
                                </div>

                                <div
                                    style="font-size: 14px; color:#ffffff;font-style: normal;font-weight: normal;text-align: center;font-weight: bold;">
                                    Hola, nos enteramos de que no recuerdas tu contraseña. No te preocupes, has
                                    click en el siguiente link y resetea tu contraseña sin dramas. Si tu no
                                    solicitaste el envio de este correo te pedimos que tomes precauciones y que
                                    cambies de cualquier forma tu contraseña.
                                </div>
                                <div style="
                                margin: 20px;
                                text-align: center;
                            ">
                                    <a href=${link}
                                        style="background-color: #2181A5; padding: 10px; border-radius: 10px;; font-size: 14px; color: #FFFFFF; font-style: normal; text-align: center; text-decoration: none"><span
                                            style=" font-size: 14px; color: #FFFFFF; font-style: normal; text-align: center; text-decoration: none">CAMBIAR
                                            CONTRASEÑA</span></a>
                                </div>
                                <div
                                    style="font-size: 14px; color:#ffffff;font-style: normal;font-weight: normal;text-align: center;font-style: italic;">
                                    Recuerda que para contactarnos puedes enviar un correo a:
                                    ${process.env.MAIL_USERNAME}
                                </div>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
    };
    transporter2.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo para "Cambio de contraseña" se envío correctamente ' + info.response);
        }
    });
};

this.Premium = (correo = "valentina@gmail.com",precio,fecha,name, celu) => {
    let transporter3 = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let mail_options = {
        from: `"Premium" <${process.env.MAIL_USERNAME}>`,
        to: correo,
        subject: 'CodeLearn: Bienvenido a CodeLearn-Gold',
        html: `<table border="0" cellpadding="0" cellspacing="0" style="width: 100%" width="100%">
        <tr>
            <td bgcolor="#daa520" style="background-color:#daa520;padding: 20px 100px;color: black;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <table class="table" border="0" cellpadding="0" cellspacing="0"
                    style="width: 100%;color: black;" width="100%" align="right">
                    <tr>
                        <td class="cell" style="padding-left: 10px">

                            <table border="0" cellpadding="0" cellspacing="0">
                                
                                <div style="text-align-last: center;">
                                    <h1
                                        style="color: #0079a7;text-align: center;font-size: xxx-large;margin-bottom: 0;">
                                        FELICIDADES
                                    </h1>
                                    <p
                                        style="font-style: italic;font-weight: bold;    text-align: center;">
                                        Ahora eres Premium</p>
                                    <img alt="Gold"
                                        src="https://images.vexels.com/media/users/3/145799/isolated/preview/2c7aaf362485babc23e951c7ac01975d-insignia-de-calidad-premium.png"
                                        style="max-height: 200px" width="auto" />
                                </div>
                                <div style="text-align: center;">
                                    <div
                                        style="font-size: 15px;text-align: center;font-weight: bold;margin: 50px;">
                                        Hola!, Ahora eres premium, queremos agradecer tu compra y venir a celebrar
                                        contigo porque, ahora que eres premium, tienes todos los cursos desbloqueados y
                                        puedes acceder a ellos cuando y como quieras,.Gracias por adquirir nuestros
                                        productos, esperamos que tu experiencia con nosotros fuera
                                        extraordinaria.Clientes como tú hacen la diferencia, es un placer servirte!
                                    </div><a href=${process.env.FRONT_URL}
                                        style="text-decoration: none;background-color: #2181A5;padding: 10px;border-radius: 10px;margin-top: 20px;"><span
                                            style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px; color: #FFFFFF; font-style: normal; text-align: center; text-decoration: none">IR
                                            AL SITIO WEB</span></a>
                                </div>
                                <div style="    text-align: -webkit-center;
                                border: 1px solid;
                                margin: 15px 180px;
                                border-radius: 10px;
                                font-weight: bold;
                                color: white;
                                background: #0000007a;font-family: monospace;">
                                <h2
                                style="width: 300px;margin: 4px;    position: relative;">
                                <label style="
                                padding: 10px  20px;
                                margin-top: -10px;
                                position: relative;
                                top: -10px;
                            "> Factura</label> <img src="https://cdn-icons-png.flaticon.com/512/4564/4564964.png"
                                        style="max-height: 50px;" /></h2>
                                    <p
                                        style="width: 300px;margin: 4px;    position: relative;">
                                        <img src="https://cdn-icons-png.flaticon.com/512/5775/5775239.png"
                                            style="max-height: 30px;" /><label style="
                                            padding: 10px  20px;
                                            margin-top: -10px;
                                            position: relative;
                                            top: -10px;
                                        ">Precio:${precio}</label> 
                                    </p>
                                    <p
                                         style="width: 300px;margin: 4px;    position: relative;">
                                        <img src="http://assets.stickpng.com/images/584856bce0bb315b0f7675ad.png"
                                        style="max-height: 30px;" /><label style="
                                        padding: 10px  20px;
                                        margin-top: -10px;
                                        position: relative;
                                        top: -10px;
                                    ">Correo: ${correo}</label> 
                                    </p>
                                    <p
                                         style="width: 300px;margin: 4px;    position: relative;">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png"
                                            style="max-height: 30px;" /><label style="
                                            padding: 10px  20px;
                                            margin-top: -10px;
                                            position: relative;
                                            top: -10px;
                                        ">Proximo pago: ${fecha}</label>
                                    </p>
                                    <p
                                         style="width: 300px;margin: 4px;    position: relative;">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828413.png"
                                            style="max-height: 30px;" /><label style="
                                            padding: 10px  20px;
                                            margin-top: -10px;
                                            position: relative;
                                            top: -10px;
                                        ">Nombre en la tarjeta: ${name}</label>
                                    </p>
                                    <p
                                         style="width: 300px;margin: 4px;    position: relative;">
                                        <img src="http://assets.stickpng.com/images/5a452601546ddca7e1fcbc87.png"
                                            style="max-height: 30px;" /><label style="
                                            padding: 10px  20px;
                                            margin-top: -10px;
                                            position: relative;
                                            top: -10px;
                                        "> Telefono: ${celu}</label>
                                    </p>
                                </div>

                                <div
                                    style=" font-style: italic;font-weight: bold;padding: 10px;">
                                    Eres parte esencial de lo que hacemos en CodeLearn; por eso, nos mantenemos
                                    pendientes de lo que necesitas y actuamos para brindarte soluciones
                                    relevantes asi que para contactarnos esta nuestro correo:
                                    ${process.env.MAIL_USERNAME}
                                </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
    };
    transporter3.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo por "Volverte Premium" se envío correctamente ' + info.response);
        }
    });
};
this.Contacto = (correo = process.env.MAIL_USERNAME,name, text) => {
    let transporter4 = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let mail_options = {
        from: `"Contacto" <${correo}>`,
        to: process.env.MAIL_USERNAME,
        subject: 'CodeLearn: Te enviaron un mensaje',
        html: `<table border="0" cellpadding="0" cellspacing="0" style="width: 100%" width="100%">
        <tr>
            <td bgcolor="#daa520" style="background-color:#daa520;padding: 20px 100px;color: black;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <table class="table" border="0" cellpadding="0" cellspacing="0"
                    style="width: 100%;color: black;" width="100%" align="right">
                    <tr>
                        <td class="cell" style="padding-left: 10px">

                            <table border="0" cellpadding="0" cellspacing="0">
                                
                                <div style="text-align-last: center;">
                                    <h1
                                        style="color: #0079a7;text-align: center;font-size: xxx-large;margin-bottom: 0;">
                                        ${name} te contacto
                                    </h1>
                                </div>
                                <div style="text-align: center;">
                                    <div
                                        style="font-size: 15px;text-align: center;font-weight: bold;margin: 50px;">
                                        El mensaje es: ${text}
                                    </div>
                                </div>
                                <div
                                    style=" font-style: italic;font-weight: bold;padding: 10px;">
                                    nombre: ${name}
                                    correo:${correo}
                                </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
    };
    transporter4.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo de Contacto se envío correctamente ' + info.response);
        }
    });
};
module.export = this;