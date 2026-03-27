// backend/controllers/listController.js
const pool = require('../config/db');

// Función 1: Obtener todas las listas
const getLists = async (req, res) => {
    try {
        // Pedimos las listas ordenadas por su posición (de izquierda a derecha)
        const result = await pool.query('SELECT * FROM lists ORDER BY position_index ASC');
        res.status(200).json(result.rows); // Devolvemos los datos en formato JSON
    } catch (error) {
        console.error('❌ Error al obtener las listas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función 2: Crear una lista nueva
const createList = async (req, res) => {
    // Angular nos enviará el 'title' y el 'position_index' en el cuerpo de la petición (req.body)
    const { title, position_index } = req.body; 
    
    try {
        // SEGURIDAD INNEGOCIABLE: Usamos $1 y $2 para evitar ataques de Inyección SQL.
        // Nunca concatenamos variables directamente en la consulta.
        const result = await pool.query(
            'INSERT INTO lists (title, position_index) VALUES ($1, $2) RETURNING *',
            [title, position_index]
        );
        res.status(201).json(result.rows[0]); // Devolvemos la lista recién creada
    } catch (error) {
        console.error('❌ Error al crear la lista:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportamos las funciones para poder usarlas en las rutas
module.exports = {
    getLists,
    createList
};