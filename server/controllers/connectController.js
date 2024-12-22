const Session = require('../models/Session');
const User = require('../models/User');

const createSession = async (req, res) => {
    try {
        const { topic, schedule, price, meetingLink } = req.body;

        const newSession = new Session({
            mentor: req.user.id, 
            topic,
            schedule,
            price,
            meetingLink,
        });

        await newSession.save();
        res.status(201).json({ message: 'Session created successfully', session: newSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getSessionsForMentor = async (req, res) => {
    try {
        const sessions = await Session.find({ mentor: req.user.id }).populate('students', 'username email');
        res.status(200).json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getSessionsForStudents = async (req, res) => {
    try {
        const sessions = await Session.find().populate('mentor', 'username email');
        res.status(200).json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const joinSession = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Add the student to the session's students list
        session.students.push(req.user.id);

        await session.save();
        res.status(200).json({ message: 'You have successfully joined the session', session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update the status of the session (mentor marks session as completed or cancelled)
const updateSessionStatus = async (req, res) => {
    try {
        const { sessionId, status } = req.body;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Validate the status
        if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        session.status = status;

        // Set the completion date if the status is 'completed'
        if (status === 'completed') {
            session.completionDate = new Date();
        }

        await session.save();
        res.status(200).json({ message: 'Session status updated', session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update the payment status for the session
const updatePaymentStatus = async (req, res) => {
    try {
        const { sessionId, paymentStatus } = req.body;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Validate the payment status
        if (!['pending', 'completed'].includes(paymentStatus)) {
            return res.status(400).json({ message: 'Invalid payment status' });
        }

        session.paymentStatus = paymentStatus;

        await session.save();
        res.status(200).json({ message: 'Payment status updated', session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createSession,
    getSessionsForMentor,
    getSessionsForStudents,
    joinSession,
    updateSessionStatus,
    updatePaymentStatus,
};
