console.log("El script main.js se ha cargado");

// Esta función carga la plantilla inicial del DOM.
const loadInitialTemplate = () => {
    // Definimos un template HTML que contiene un encabezado, un formulario para agregar usuarios y una lista para mostrar los usuarios.
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <input name="name" required/>
        </div>
        <div>
            <label>Apellido</label>
            <input name="lastname" required/>
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list"></ul>
    `;
    const body = document.getElementsByTagName('body')[0]; // Seleccionamos el primer elemento <body> del DOM
    body.innerHTML = template; // Insertamos el template en el cuerpo del documento
};

// Función para obtener la lista de usuarios del servidor
const getUsers = async () => {
    try {
        const response = await fetch('/users'); // Hacemos una solicitud GET a la ruta /users
        if (!response.ok) throw new Error('Error al obtener usuarios'); // Comprobamos si la respuesta es correcta

        const users = await response.json(); // Convertimos la respuesta a JSON
        const template = user => ` <!-- Template para cada usuario -->
            <li>${user.name} ${user.lastname}
            <button data-id="${user._id}">Eliminar</button></li> <!-- Botón para eliminar el usuario -->
        `;
        const userList = document.getElementById('user-list'); // Seleccionamos la lista donde se mostrarán los usuarios
        userList.innerHTML = users.map(user => template(user)).join(''); // Insertamos cada usuario en la lista

        // Agregar evento de eliminación a cada botón
        users.forEach(user => {
            const userNode = document.querySelector(`[data-id="${user._id}"]`); // Seleccionamos el botón de eliminar por ID
            userNode.addEventListener('click', async () => { // Agregamos un evento click al botón
                try {
                    const deleteResponse = await fetch(`/users/${user._id}`, {
                        method: 'DELETE', // Método para eliminar el usuario
                    });
                    if (!deleteResponse.ok) throw new Error('Error al eliminar el usuario'); // Comprobamos la respuesta

                    userNode.parentNode.remove(); // Eliminamos el usuario de la lista en el DOM
                    alert('Eliminado de la lista'); // Alerta de confirmación
                } catch (error) {
                    console.error('Error al eliminar usuario:', error); // Manejo de errores
                }
            });
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Manejo de errores
    }
};

// Función para agregar el listener al formulario
const addFormListener = () => {
    const userForm = document.getElementById('user-form'); // Seleccionamos el formulario
    
    userForm.onsubmit = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        
        const formData = new FormData(userForm); // Obtenemos los datos del formulario
        const data = Object.fromEntries(formData.entries()); // Convertimos los datos a un objeto

        try {
            await fetch('/users', {
                method: 'POST', // Método para agregar un nuevo usuario
                body: JSON.stringify(data), // Enviamos los datos como JSON
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                },
            });

            userForm.reset(); // Reiniciamos el formulario
            getUsers(); // Llamamos a getUsers para actualizar la lista de usuarios
        } catch (error) {
            console.error('Error al crear usuario:', error); // Manejo de errores
        }
    };
};

// Esta función se ejecuta al cargar la ventana
window.onload = () => {
    console.log("window.onload ejecutándose");
    loadInitialTemplate(); // Cargamos la plantilla inicial
    addFormListener(); // Agregamos el listener al formulario
    console.log("Cargando usuarios...");
    getUsers(); // Llamamos a getUsers para obtener la lista de usuarios
};
