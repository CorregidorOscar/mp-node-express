const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

//midleware
app.use(bodyParser.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3878658393553340-020202-2d392964bd8b49573d42cc6b3faf827d-1067161412",
});

//routes
app.post("/checkout", (req, res) => {
  const { price, title } = req.body;
  // Crea un objeto de preferencia
  //orden de compra
  let preference = {
    items: [
      {
        title: title,
        unit_price: parseInt(price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//server
app.listen(3000, () => {
  console.log("Listen on port 3000");
});
