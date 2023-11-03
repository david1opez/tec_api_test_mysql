const express = require('express');
const zonasController = require('../api/zonas.js');
const router = express.Router();

router.get('/api/getPaneles', zonasController.getPaneles);
router.post('/api/setPanel', zonasController.setPanel);

module.exports = router;
