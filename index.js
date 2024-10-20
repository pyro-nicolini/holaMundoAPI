// Importamos Mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Conectar a la base de datos MongoDB
mongoose.connect(' Your Server MongoDB ')
    .then(() => console.log("Conectado a MongoDB")) // Mensaje de éxito si la conexión es correcta
    .catch(err => console.error("Error al conectar a MongoDB:", err)); // Manejo de errores si la conexión falla

// Definición del modelo 'User' en Mongoose
const User = mongoose.model('User', {
    username: String, // Campo 'username' que almacena una cadena
    edad: Number, // Campo 'edad' que almacena un número
});

// Función para crear un nuevo usuario
const crear = async () => {
    const user = new User({ username: 'chanchito triste', edad: 14 }); // Crea una nueva instancia de 'User'
    const savedUser = await user.save(); // Guarda el usuario en la base de datos
    console.log(savedUser); // Muestra el usuario guardado en la consola
};

// llamar a la función crear() para ejecutar la creación de usuario
// crear(); // Descomentar para ejecutar la función

// Función para buscar todos los usuarios
const buscarTodo = async () => {
    const users = await User.find(); // Encuentra y retorna todos los usuarios
    console.log(users); // Muestra todos los usuarios encontrados en la consola
};

// llamar a la función buscarTodo() para ejecutar la búsqueda de todos los usuarios
// buscarTodo(); // Descomentar para ejecutar la función

// Función para buscar usuarios por un campo específico
const buscar = async () => {
    const user = await User.find({ username: 'Chanchullo' }); // Busca usuarios que coincidan con el username
    console.log(user); // Muestra los usuarios encontrados en la consola (puede ser un array vacío)
};

// llamar a la función buscar() para ejecutar la búsqueda de un usuario específico
// buscar(); // Descomentar para ejecutar la función

// Función para buscar un solo usuario
const buscarUno = async () => {
    const user = await User.findOne({ username: 'Chanchullo' }); // Busca un único usuario que coincida con el username
    console.log(user); // Muestra el usuario encontrado (o null si no existe) en la consola
};

// llamar a la función buscarUno() para ejecutar la búsqueda de un único usuario
// buscarUno(); // Descomentar para ejecutar la función

// Función para actualizar un usuario existente
const actualizar = async () => {
    const user = await User.findOne({ username: 'Chanchullo' }); // Busca el usuario que se va a actualizar
    console.log(user); // Muestra el usuario encontrado en la consola
    user.edad = 30; // Actualiza el campo 'edad' del usuario
    await user.save(); // Guarda los cambios en la base de datos
    console.log(user); // Muestra el usuario actualizado en la consola
};

// llamar a la función actualizar() para ejecutar la actualización del usuario
// actualizar(); // Descomentar para ejecutar la función

// Función para eliminar un usuario
const eliminar = async () => {
    const user = await User.findOne({ username: 'chanchito triste' }); // Busca el usuario que se va a eliminar
    console.log(user); // Muestra el usuario encontrado en la consola
    if (user) { // Verifica si el usuario existe
        await user.deleteOne(); // Elimina el usuario de la base de datos
    }
};

// llamar a la función eliminar() para ejecutar la eliminación del usuario
// eliminar(); // Descomentar para ejecutar la función
