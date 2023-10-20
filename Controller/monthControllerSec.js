const arrayData = require('../utils/row2secondChart')

module.exports = {
    userGETData: async (req, res) => {
        try {
            res.status(200).json(arrayData)
        } catch (error) { res.status(500).json({ msg: error }) }
    }
}




// const monthSchema2 = require("../model/monthSchema2");
// // second row second chsrt
// module.exports = {
//     monthUserCreate: async (req, res) => {
//         try {
//             const { name, data } = req.body;
//             const newMonthUser = new monthSchema2({
//                 name: name,
//                 data: data,
//             });
//             const result = await newMonthUser.save();
//             console.log(result);
//             if (result) {
//                 res.status(200).json({ msg: "user saved", month2: result });
//             } else {
//                 res.status(200).json({ msg: "user not saved" });
//             }
//         } catch (error) {
//             res.status(500).json({ msg: error.message });
//         }
//     },
//     userGETData: async (req, res) => {
//         try {
//             const found = await monthSchema2.find();
//             console.log(found);
//             if (found) {
//                 res.status(200).json({ ms: "user reterived", month2: found });
//             } else {
//                 res.status(200).json({ msg: "user not found" });
//             }
//         } catch (error) {
//             res.status(200).json({ msg: error.message });
//         }
//     },
// };
