const urlParams = new URLSearchParams(window.location.search);
const codigo_editorial = urlParams.get('codigo_editorial');
const nombre_editorial = urlParams.get('nombre_editorial');
const contacto = urlParams.get('contacto');
const telefono = urlParams.get('telefono');

document.getElementById('codigo_editorial').value = codigo_editorial;
document.getElementById('nombre_editorial').value = nombre_editorial;
document.getElementById('contacto').value = contacto;
document.getElementById('telefono').value = telefono;

const formulario = document.getElementById('ingresoDatos');
const modificarBtn = document.getElementById('modificarDato');

modificarBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    const url = `http://localhost:8000/api/editoriales/${codigo_editorial}`;

    const editorial = {
        nombre_editorial: document.getElementById('nombre_editorial').value,
        contacto: document.getElementById('contacto').value,
        telefono: document.getElementById('telefono').value
    }
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editorial)
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta del servidor es exitosa, mostramos una alerta exitosa
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los datos se han modificado correctamente.',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                // Luego, nos redirigimos a la pagina index.html
                window.location.href = 'index.html'
            });
        } else {
            // Si ocurre un error, mostramos una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Ha sucedido un error.',
                text: 'No se han podido modificar los datos.'
            });
            throw new Error('Ha sucedido un error.');
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Ha sucedido un error.',
            text: 'La respuesta del servidor fue ' + response.status
        });
        throw new Error('Ha sucedido un error. La respuesta del servidor fue ' + response.status);
    });
});
