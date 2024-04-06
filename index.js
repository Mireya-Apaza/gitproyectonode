const express = require('express');
const app = express();

app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const producto = productos.find(p => p.id === parseInt(id));
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    producto.nombre = nombre;
    producto.precio = precio;
    res.json(producto);
});

// Ruta para eliminar un producto existente (DELETE)
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(p => p.id !== parseInt(id));
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});