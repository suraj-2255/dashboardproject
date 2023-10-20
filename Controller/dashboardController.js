const cardsData = require('../utils/config')
//first Row

module.exports = {
    cardsDataHandler: async (req, res) => {
        try {
            res.json(cardsData);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
} 