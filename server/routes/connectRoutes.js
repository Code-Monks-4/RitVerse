const express = require('express');
const { createSession, getSessionsForMentor, getSessionsForStudents, joinSession, updateSessionStatus, updatePaymentStatus } = require('../controllers/connectController');

const router = express.Router();

router.post('/create',createSession);

router.get('/mentor/sessions',getSessionsForMentor);

router.get('/student/sessions',getSessionsForStudents);

router.post('/join',joinSession);

router.patch('/update-status',updateSessionStatus);

router.patch('/update-payment',updatePaymentStatus);

module.exports = router;
