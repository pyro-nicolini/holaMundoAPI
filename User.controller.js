// Importamos el modelo de usuario que se utilizará para interactuar con la base de datos
const Users = require('./User'); // Asegúrate de que este es el modelo correcto

// Definimos el controlador de usuarios
const UserController = {
    // Método para obtener un usuario por ID
    get: async (req, res) => {
        const { id } = req.params; // Extraemos el ID del parámetro de la solicitud
        console.log(`Obteniendo usuario con ID: ${id}`); // Mensaje de depuración en la consola
        try {
            const user = await Users.findOne({ _id: id }); // Busca el usuario en la base de datos usando el ID
            if (!user) {
                console.log(`Usuario con ID: ${id} no encontrado`); // Mensaje si no se encuentra el usuario
                return res.status(404).send({ error: 'Usuario no encontrado' }); // Respuesta 404 si no se encuentra
            }
            res.status(200).send(user); // Respuesta 200 con el usuario encontrado
        } catch (error) {
            console.error('Error al obtener usuario:', error.message); // Manejo de errores, muestra el mensaje en la consola
            res.status(500).send({ error: 'Error al obtener usuario' }); // Respuesta 500 en caso de error
        }
    },
    
    // Método para listar todos los usuarios
    list: async (req, res) => {
        try {
            const users = await Users.find(); // Busca todos los usuarios en la base de datos
            console.log(`Listando usuarios: ${users.length} usuarios encontrados`); // Mensaje de depuración con la cantidad de usuarios encontrados
            res.status(200).send(users); // Respuesta 200 con la lista de usuarios
        } catch (error) {
            console.error('Error al listar usuarios:', error.message); // Manejo de errores
            res.status(500).send({ error: 'Error al listar usuarios' }); // Respuesta 500 en caso de error
        }
    },
    
    // Método para crear un nuevo usuario
    create: async (req, res) => {
        const user = new Users(req.body); // Crea una nueva instancia de usuario con los datos del cuerpo de la solicitud
        console.log('Creando nuevo usuario:', user); // Mensaje de depuración con el nuevo usuario
        try {
            const savedUser = await user.save(); // Guarda el nuevo usuario en la base de datos
            res.status(201).send(savedUser._id); // Respuesta 201 con el ID del usuario creado
        } catch (error) {
            console.error('Error al crear usuario:', error.message); // Manejo de errores
            res.status(500).send({ error: 'Error al crear usuario' }); // Respuesta 500 en caso de error
        }
    },
    
    // Método para actualizar un usuario existente
    update: async (req, res) => {
        const { id } = req.params; // Extrae el ID del parámetro de la solicitud
        console.log(`Actualizando usuario con ID: ${id}`, req.body); // Mensaje de depuración con el ID y los datos a actualizar
        try {
            const user = await Users.findOne({ _id: id }); // Busca el usuario por ID
            if (!user) {
                console.log(`Usuario con ID: ${id} no encontrado para actualizar`); // Mensaje si no se encuentra el usuario
                return res.status(404).send({ error: 'Usuario no encontrado' }); // Respuesta 404 si no se encuentra
            }
            Object.assign(user, req.body); // Actualiza los campos del usuario con los datos del cuerpo de la solicitud
            await user.save(); // Guarda los cambios en la base de datos
            res.sendStatus(204); // Respuesta 204 No Content
        } catch (error) {
            console.error('Error al actualizar usuario:', error.message); // Manejo de errores
            res.status(500).send({ error: 'Error al actualizar usuario' }); // Respuesta 500 en caso de error
        }
    },
    
    // Método para eliminar un usuario
    destroy: async (req, res) => {
        const { id } = req.params; // Extrae el ID del parámetro de la solicitud
        console.log(`Eliminando usuario con ID: ${id}`); // Mensaje de depuración con el ID del usuario a eliminar
        try {
            const user = await Users.findByIdAndDelete(id); // Busca y elimina el usuario por ID
            if (!user) {
                console.log(`Usuario con ID: ${id} no encontrado para eliminar`); // Mensaje si no se encuentra el usuario
                return res.status(404).send({ error: 'Usuario no encontrado' }); // Respuesta 404 si no se encuentra
            }
            res.sendStatus(204); // Respuesta 204 No Content
        } catch (error) {
            console.error("Error al eliminar el usuario:", error.message); // Manejo de errores
            res.status(500).send({ error: `Error al eliminar el usuario: ${error.message}` }); // Respuesta 500 en caso de error
        }
    }
}

// Exportamos el controlador para que pueda ser utilizado en otras partes de la aplicación
module.exports = UserController;
