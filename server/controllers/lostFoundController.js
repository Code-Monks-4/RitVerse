const LostItem = require('../models/LostItem');

const createLostItem = async (req, res) => {
    try {
        const { title, description, image, location, contact } = req.body;

        const newLostItem = new LostItem({
            title,
            description,
            image,
            location,
            contact,
            owner: req.user.id, 
        });

        await newLostItem.save();
        res.status(201).json({ message: 'Lost item reported successfully', item: newLostItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getLostItems = async (req, res) => {
    try {
        const lostItems = await LostItem.find({ status: 'lost' }).populate('owner', 'username email');
        res.status(200).json(lostItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getFoundItems = async (req, res) => {
    try {
        const foundItems = await LostItem.find({ status: 'found' }).populate('owner', 'username email').populate('resolver', 'username email');
        res.status(200).json(foundItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const markItemAsFound = async (req, res) => {
    try {
        const { itemId, resolverId } = req.body;

        const lostItem = await LostItem.findById(itemId);

        if (!lostItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        lostItem.status = 'found';
        lostItem.resolver = resolverId;
        lostItem.resolvedDate = new Date();

        await lostItem.save();
        res.status(200).json({ message: 'Item marked as found', item: lostItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    createLostItem,
    getLostItems,
    getFoundItems,
    markItemAsFound,
};
