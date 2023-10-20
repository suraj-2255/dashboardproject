const ChartSchema = require('../model/dashChartSchema');

// third row 
module.exports = {
    crateChartData: async (req, res) => {
        try {
            const { name, data } = req.body
            const createData = new ChartSchema({
                name: name,
                data: data
            })
            const result = await createData.save()
            if (result) {
                res.status(200).json({ msg: "data saved", chart: result })
            } else { res.status(404).json({ msg: "data not saved" }) }
        }
        catch (error) { res.status(500).json({ error: error.message }) }
    },
    chartDataGET: async (req, res) => {
        try {
            const found = await ChartSchema.find()
            console.log(found)
            if (found) {
                res.status(200).json({ msg: "data found", ChartSchema: found })
            } else {
                res.status(200).json({ msg: "not not found" })
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}