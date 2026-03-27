// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Forzamos una pequeña consulta para confirmar que la conexión es exitosa
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL (Revisa tu contraseña en el .env)', err.message);
    } else {
        console.log('✅ Conectado exitosamente a PostgreSQL (trello_clon_db)');
    }
});

module.exports = pool;