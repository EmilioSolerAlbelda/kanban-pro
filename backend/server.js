// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pool = require('./config/db'); 

const app = express();

// 1. MIDDLEWARES
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200', // Permite que Angular (4200) hable con Node (3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// 2. RUTAS 
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes'); // <-- NECESITAS ESTO

app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes); // <-- CUALQUIER PETICIÓN A /tasks IRÁ AQUÍ

// 3. RUTA DE SALUD
app.get('/api/health', (req, res) => {
    res.status(200).json({ estado: 'OK', mensaje: 'Kanban Pro Online 🚀' });
});

// 4. ARRANCAR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor backend corriendo en http://localhost:${PORT}`);
});