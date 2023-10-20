const years_data = require('../utils/row2firstChart')

module.exports = {
    monthGET: async (req, res) => {
        try {
            res.status(200).json(years_data)
        } catch (error) { res, sattus(500).json({ msg: error }) }
    }
}
