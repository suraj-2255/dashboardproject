const productList = require('../utils/productLitsSchma')

module.exports = {
    product: async (req, res) => {
        try {
            res.status(200).json(productList)
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    }
}

