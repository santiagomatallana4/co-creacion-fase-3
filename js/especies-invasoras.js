async function cargarDatos() {
    try {
        const response = await fetch('/especies');
        const especies = await response.json();
        
        // Contenedor donde se mostrarán los datos de las especies
        const contenedor = document.getElementById('contenedor-especies');

        especies.forEach((especie) => {
            // Crear el contenedor para cada especie
            const especieDiv = document.createElement('div');
            especieDiv.classList.add('especie');

            // Crear y agregar el nombre común
            const nombreCombinado = document.createElement('h2');
            nombreCombinado.textContent = especie.Especie;
            especieDiv.appendChild(nombreCombinado);

            // Crear y agregar el nombre científico
            const nombreCientifico = document.createElement('p');
            nombreCientifico.textContent = `Nombre científico: ${especie['Nombre científico']}`;
            especieDiv.appendChild(nombreCientifico);

            // Crear y agregar la descripción
            const descripcion = document.createElement('p');
            descripcion.textContent = `Descripción: ${especie.Descripción}`;
            especieDiv.appendChild(descripcion);

            // Crear y agregar la imagen
            const imagen = document.createElement('img');
            imagen.src = especie.Imagen;  // La ruta a la imagen
            imagen.alt = especie.Especie; // El nombre de la especie como texto alternativo
            imagen.classList.add('imagen-especie');
            especieDiv.appendChild(imagen);

            // Añadir la especie al contenedor
            contenedor.appendChild(especieDiv);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDatos);