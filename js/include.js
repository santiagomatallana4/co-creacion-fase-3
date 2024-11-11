const cache = {};

function includeHTML() {
    let elements = document.querySelectorAll("[data-include]");

    elements.forEach(element => {
        let file = element.getAttribute("data-include");
        if (file) {
            if (cache[file]) {
                element.innerHTML = cache[file];
            } else {
                fetch(file)
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error('Error al cargar el archivo: ' + file);
                    })
                    .then(data => {
                        cache[file] = data;
                        element.innerHTML = data;
                    })
                    .catch(error => {
                        console.log('Error:', error);
                        element.innerHTML = `
                            <div style="color: red; text-align: center; font-weight: bold;">
                                Error: No se pudo cargar el contenido solicitado.
                            </div>`;
                    });
            }
        }
    });
}

window.addEventListener("DOMContentLoaded", includeHTML);