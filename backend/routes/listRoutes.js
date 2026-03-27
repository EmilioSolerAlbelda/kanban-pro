// backend/routes/listRoutes.js
const express = require('express');
const router = express.Router();
const { getLists, createList } = require('../controllers/listController');

// Definimos qué función se ejecuta según el tipo de petición a la URL base
router.get('/', getLists);   // Si Angular hace un GET  -> Devuelve todas las listas
router.post('/', createList);// Si Angular hace un POST -> Crea una lista nueva

module.exports = router;