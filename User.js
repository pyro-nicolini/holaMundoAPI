// Importamos el módulo Mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Definimos el modelo de 'User' utilizando Mongoose
const Users = mongoose.model("User", {
  // Campo 'name' que es obligatorio y debe tener un mínimo de 3 caracteres
  name: {
    type: String, // El tipo de dato es String
    required: true, // Este campo es obligatorio
    minlength: 3, // Longitud mínima de 3 caracteres
  },
  // Campo 'lastname' que es obligatorio y debe tener un mínimo de 3 caracteres
  lastname: {
    type: String, // El tipo de dato es String
    required: true, // Este campo es obligatorio
    minlength: 3, // Longitud mínima de 3 caracteres
  },
});

// Exportamos el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Users;
