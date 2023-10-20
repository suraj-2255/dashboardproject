const forData = require('../utils/fourRowData')

module.exports = {
    foundData: async (req, res) => {
        try {
            res.status(200).json(forData)
        } catch (error) { res.status(500).json({ msg: error }) }
    }
}



