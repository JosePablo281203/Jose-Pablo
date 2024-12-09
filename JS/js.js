document.addEventListener('DOMContentLoaded', () => {
    // Obtiene el nombre del archivo actual desde la URL (por ejemplo, "contacto.html").
// Esto se utiliza para identificar la página en la que el usuario se encuentra.
    const currentPage = window.location.pathname.split('/').pop();
    const opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];

    if (currentPage === 'contacto.html') {
        const form = document.getElementById('opinion');

        // Manejo del envío del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const marcaSeleccionada = document.querySelector('input[name="marca"]:checked');
            const comentario = document.getElementById('comentario').value;

            // Validar selección de marca
            if (!marcaSeleccionada) {
                alert('Por favor selecciona una marca.');
                return;
            }

            const marca = marcaSeleccionada.value;

            // Crear objeto de opinión
            const opinion = { nombre, marca, comentario };

            // Guardar en localStorage
            opiniones.push(opinion);
            localStorage.setItem('opiniones', JSON.stringify(opiniones));

            // Limpiar formulario
            form.reset();

            alert('¡Opinión enviada con éxito!');
        });
    }

    if (currentPage === 'blog.html') {
        const blogPostsContainer = document.getElementById('blog');

        // Mostrar opiniones
        function mostrarOpiniones() {
            blogPostsContainer.innerHTML = '';

            opiniones.forEach((opinion) => {
                const post = document.createElement('div');
                post.classList.add('blog-post', 'border-bottom', 'pb-3', 'mb-3');
                post.innerHTML = `
                    <div class="post-header">
                        <span class="autor fw-bold">${opinion.nombre}</span>
                        <span class="fecha text-muted">${new Date().toLocaleDateString()}</span>
                    </div>
                    <h5 class="titulo">${opinion.marca}</h5>
                    <p class="texto">${opinion.comentario}</p>
                `;
                blogPostsContainer.appendChild(post);
            });
        }

        mostrarOpiniones();
    }
});
