const board2RevenueChartSchema = require("../model/board2ReveChartSchema");

module.exports = {
    dataCreate: async (req, res) => {
        try {
            const { name, data } = req.body;
            const newChart = new board2RevenueChartSchema({
                name: name,
                data: data
            });
            const result = await newChart.save();
            console.log(result);
            if (result) {
                res.status(200).json({ msg: "user saved", chartbord: result });
            } else {
                res.status(200).json({ msg: "user NOT saved" });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }, 

    getData: async (req, res) => {
        try {
            const found = await board2RevenueChartSchema.find();
            console.log(found);
            if (found) {
                res.status(200).json({ msg: "data found", chartbord: found });
            } else {
                res.status(201).json({ msg: "data not found" });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
};
