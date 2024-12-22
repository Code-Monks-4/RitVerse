const express = require('express');
const { createLostItem, getLostItems, getFoundItems, markItemAsFound } = require('../controllers/lostFoundController');

const router = express.Router();

router.post('/create', createLostItem);

router.get('/lost', getLostItems);

router.get('/found', getFoundItems);

router.patch('/mark-found', markItemAsFound);

module.exports = router;
