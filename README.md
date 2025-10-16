# contactos-localstorage
🧩 Investigación — Manejo del DOM en JavaScript
🔹 ¿Qué es el DOM?

El DOM (Document Object Model) es una representación en forma de árbol de todos los elementos de una página web.
Cada etiqueta HTML se convierte en un nodo, y JavaScript puede acceder a esos nodos para leerlos, modificarlos o eliminarlos en tiempo real, sin recargar la página.

Por ejemplo, un <div> dentro del HTML se convierte en un nodo que puede manipularse desde el código JavaScript.

🔹 ¿Para qué sirve?

El DOM permite que las páginas web sean dinámicas e interactivas.
Gracias al DOM, podemos:

Cambiar textos o colores de un elemento.

Agregar o eliminar nodos del documento.

Escuchar eventos (clics, formularios, teclado, etc.).

Actualizar contenido visual de manera inmediata.

🔹 Cómo se aplica en este proyecto

En la aplicación de Lista de Contactos, el DOM se usa para:

Crear elementos dinámicos (filas de una tabla) cuando el usuario agrega un contacto.

Actualizar la información en pantalla al editar o eliminar.

Escuchar eventos con addEventListener para detectar cuando se envía el formulario o se escribe en el buscador.

Modificar elementos existentes para mostrar u ocultar mensajes como “No hay contactos”.

🔹 Ejemplo práctico del código
const row = document.createElement('tr'); // Crea una nueva fila en la tabla
row.innerHTML = `
  <td>${contact.name}</td>
  <td>${contact.email}</td>
  <td>${contact.phone}</td>
  <td>
    <button class="edit">Editar</button>
    <button class="delete">Eliminar</button>
  </td>
`;
list.appendChild(row); // Inserta la fila en el DOM


➡️ Este fragmento crea un nuevo elemento HTML (<tr>) y lo agrega al documento cada vez que se guarda un contacto.
No se recarga la página, solo se actualiza el DOM.

🔹 Conclusión

El manejo del DOM es esencial en el desarrollo web moderno porque permite que las páginas sean dinámicas, rápidas y reactivas.
En este proyecto, el DOM se utiliza para construir y actualizar visualmente la lista de contactos con base en la información almacenada en localStorage.

⚙️ Tecnologías utilizadas

HTML5

CSS3

JavaScript (DOM + LocalStorage)

💻 Cómo ejecutar

Abre la carpeta del proyecto en Visual Studio Code.

Haz clic derecho en index.html → “Open with Live Server”.

Agrega, busca, edita o elimina contactos.

Tus contactos se guardarán automáticamente en el navegador.

🎨 Características

Validación de campos (solo números en teléfono).

Edición en un modal visual.

Tabla interactiva con acciones.

Diseño moderno y responsivo.

Almacenamiento persistente en localStorage.

🧑‍💻 Autor

Kevin Rico
Proyecto educativo sobre manejo del DOM y almacenamiento local.
 
 
 
 # github pages
 https://krico2812.github.io/contactos-localstorage/

