// Importamos las librerías necesarias
const express = require('express'); // Importa Express para crear el servidor
const mongoose = require('mongoose'); // Importa Mongoose para interactuar con MongoDB
const user = require('./user.controller'); // Importa el controlador de usuarios que contiene la lógica para manejar usuarios
const app = express(); // Creamos una instancia de la aplicación Express
const port = 3000; // Definimos el puerto en el que se ejecutará el servidor

// Middleware para procesar JSON
app.use(express.json()); // Permite que la aplicación maneje datos en formato JSON en las solicitudes entrantes

// Conectar a MongoDB
mongoose.connect('mongodb+srv://wildliners2:qwert1234@cluster0.diusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Conectado a MongoDB")) // Mensaje de éxito al conectar
    .catch(err => console.error("Error al conectar a MongoDB:", err)); // Manejo de errores en caso de fallo

// Definición de rutas
app.get('/users', user.list); // Ruta para obtener la lista de usuarios
app.post('/users', user.create); // Ruta para crear un nuevo usuario
app.get('/users/:id', user.get); // Ruta para obtener un usuario específico por ID
app.put('/users/:id', user.update); // Ruta para actualizar un usuario específico por ID
app.patch('/users/:id', user.update); // Ruta para actualizar parcialmente un usuario específico por ID
app.delete('/users/:id', user.destroy); // Ruta para eliminar un usuario específico por ID

// Servir archivos estáticos
app.use(express.static('app')); // Permite servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'app'

// Ruta para la página de inicio
app.get('/', (req, res) => {
    console.log(__dirname); // Mensaje en la consola que muestra el directorio actual
    res.sendFile(`${__dirname}/index.html`); // Envía el archivo index.html como respuesta al cliente
});

// Ruta para manejar páginas no encontradas
app.get('*', (req, res) => {
    res.status(404).send('Esta página no existe'); // Envía un mensaje de error 404 si la ruta no coincide con ninguna definida
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Arrancando el Servidor... ${port}`); // Mensaje al iniciar el servidor indicando el puerto
});
