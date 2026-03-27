// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// RUTA PARA CREAR TAREA (Lo que activa tu botón "+ Añadir tarjeta")
router.post('/', async (req, res) => {
    const { list_id, title, order_index } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (list_id, title, order_index) VALUES ($1, $2, $3) RETURNING *',
            [list_id, title, order_index]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al guardar la tarea');
    }
});

module.exports = router;