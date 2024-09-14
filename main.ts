import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: `${process.env.PAGE}`, methods: "POST" }));

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.query;

  const SendEmailResponse = () => {
    const t2 = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY,
      },
    });

    t2.sendMail(
      {
        from: `"Correo de Confirmación" <${process.env.EMAIL}>`,
        to: String(email),
        subject: "Tu correo a sido recibido con éxito",
        text: `Hola ${name}, te informamos que tu correo que nos mandaste esta siendo revisado por lo que te pedimos paciencia. Esto puede tardar de 24hrs a 48hrs en ser contestado por nuestro equipo.`,
      },
      (error) => {
        if (error) {
          res.json({ status: 500, message: error });
        } else {
          res.json({ status: 200, message: "Se envió el correo con éxito!" });
        }
      }
    );
  };

  const t1 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSKEY,
    },
  });

  t1.sendMail(
    {
      from: `"Nuevo Cliente 👀🍾" <${process.env.Email}>`,
      to: process.env.EMAIL_SEND,
      subject: "Un nuevo cliente a solicitado nuestros servicios",
      html: `
      <table
        style="
          max-width: 550px;
          width: 100%;
          background-color: #f2f2f2;
          border-collapse: collapse;
          border: 1px solid #ccc;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
        "
      >
        <tr style="border-bottom: solid 1px #ccc; height: 50px; text-align: center">
          <td style="border-right: solid 1px #ccc">Nombre</td>
          <td>Correo</td>
        </tr>
        <tr
          style="
            width: 100%;
            background-color: white;
            height: 50px;
            text-align: center;
          "
        >
          <td style="border-right: solid 1px #ccc">${name}</td>
          <td>${email}</td>
        </tr>
      </table>
      <table
        style="
          max-width: 550px;
          width: 100%;
          background-color: #f2f2f2;
          border-collapse: collapse;
          border: 1px solid #ccc;
          border-top: none;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
        "
      >
        <thead>
          <tr
            style="
              width: 100%;
              text-align: center;
              height: 50px;
              border-bottom: solid 1px #ccc;
            "
          >
            <td>Message</td>
          </tr>
        </thead>
        <tbody>
          <tr style="width: 100%; background-color: white">
            <td style="padding: 20px">${message}</td>
          </tr>
        </tbody>
      </table>
      `,
    },
    (error) => {
      if (error) {
        res.json({ status: 500, message: error });
      } else {
        SendEmailResponse();
      }
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
