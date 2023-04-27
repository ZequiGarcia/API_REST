

function cargaDatos(){
    fetch('http://localhost:8000/api/editoriales')
    .then(response => response.json())
    .then(data => {
        const editorialesTable = document.querySelector('#editoriales-table tbody');
        data.forEach(edi => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${edi.codigo_editorial}</td>
                <td>${edi.nombre_editorial}</td>
                <td>${edi.contacto}</td>
                <td>${edi.telefono}</td>
                <td class="btns">
                <a href="editar.html?codigo_editorial=${edi.codigo_editorial}&nombre_editorial=${edi.nombre_editorial}&contacto=${edi.contacto}&telefono=${edi.telefono}" class="btn btn-secondary">Modificar</a>
                    <a href="#" class="btn btn-danger" onclick="eliminarDato('${edi.codigo_editorial}')">Eliminar</a>
                </td>
            `;
            editorialesTable.appendChild(row);
        });
    })
    //capturar alguna exepcion
    .catch(error => console.error(error));
}

function eliminarDato(codigoEditorial){
    //Validar que se la funcion resivio el id
    if(codigoEditorial){
        const url = `http://localhost:8000/api/editoriales/${codigoEditorial}`;
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Se a borrado exitosamente.',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    // Luego, nos redirigimos a la pagina index.html
                    window.location.href = 'index.html'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ha sucedido un error.',
                    text: 'No se han podido borrar los datos.'
                });
                throw new Error('Ha sucedido un error.');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    
}