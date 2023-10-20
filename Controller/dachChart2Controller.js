const dachChart2Schema = require('../model/dashChart2Schema')

module.exports = {
    setData: async (req, res) => {
        try {
            const { userID, percent } = req.body
            const setDataCreate = new dachChart2Schema({
                userID: userID,
                percent: percent,
            })
            const result = await setDataCreate.save()
            if (result) {
                res.status(200).json({ msg: "data saved", chart2: result })
            }
            else { res.status(200).json({ msg: "data not saved" }) }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getData: async (req, res) => {
        try {
            const findData = await dachChart2Schema.find()
            if (findData) {
                res.status(200).json({ findData })
            } else {
                res.status(200).json({ msg: "not found" })
            }

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}