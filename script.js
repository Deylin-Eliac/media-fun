// Asegúrate de incluir la librería html2canvas en tu HTML
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    const generarBtn = document.getElementById('generar-btn');
    const addProductoBtn = document.getElementById('add-producto');
    const productosContainer = document.getElementById('productos-container');

    addProductoBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('producto-item');
        div.innerHTML = `
            <input type="text" class="descripcion" placeholder="Descripción">
            <input type="number" class="cantidad" placeholder="Cantidad" value="1">
        `;
        productosContainer.appendChild(div);
    });

    generarBtn.addEventListener('click', () => {
        const cliente = document.getElementById('cliente').value;
        const correo = document.getElementById('correo').value;
        const numero = document.getElementById('numero').value;
        const logoUrl = document.getElementById('logo-url').value;
        const total = document.getElementById('total').value;

        // Llenar la plantilla de la factura con los datos ingresados
        document.getElementById('factura-cliente').textContent = cliente;
        document.getElementById('factura-correo').textContent = correo;
        document.getElementById('factura-numero').textContent = numero;
        document.getElementById('factura-total').textContent = `$${parseFloat(total).toFixed(2)}`;

        const productos = [];
        document.querySelectorAll('.producto-item').forEach(item => {
            const descripcion = item.querySelector('.descripcion').value;
            const cantidad = item.querySelector('.cantidad').value;
            if (descripcion && cantidad) {
                productos.push({ descripcion, cantidad });
            }
        });

        const productosTabla = document.getElementById('factura-productos');
        productosTabla.innerHTML = ''; // Limpiar la tabla
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
            `;
            productosTabla.appendChild(tr);
        });

        // Cargar el logo si se proporciona una URL
        const logoPlaceholder = document.getElementById('logo-placeholder');
        logoPlaceholder.innerHTML = '';
        if (logoUrl) {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Necesario para imágenes de diferentes dominios
            img.src = logoUrl;
            img.onload = () => {
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'cover';
                logoPlaceholder.appendChild(imgElement);
                // Una vez que el logo está cargado, generar la imagen
                generarImagenFactura();
            };
            img.onerror = () => {
                console.error("Error al cargar el logo. Generando sin logo.");
                generarImagenFactura();
            };
        } else {
            // Si no hay logo, generar la imagen inmediatamente
            generarImagenFactura();
        }
    });

    function generarImagenFactura() {
        const facturaContainer = document.getElementById('factura-container');
        facturaContainer.style.display = 'block'; // Mostrar el contenedor

        html2canvas(facturaContainer, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            // Crear un enlace para descargar la imagen
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'factura.png';
            link.click();

            facturaContainer.style.display = 'none'; // Ocultar el contenedor después de generar
        });
    }
});
