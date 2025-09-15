const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Sirve los archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
