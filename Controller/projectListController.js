const projectListSchema = require("../model/projectListSchema");

module.exports = {
  userListCreate: async (req, res) => {
    try {
      const { project, assighnto, asignDate, priority, status, cost } = req.body;
      const { cust, team } = req.files;
      // console.log("req.file=======>>>>", req.files);
      const newUser = new projectListSchema({
        cust: {
          data: cust[0].buffer,
          contentType: cust[0].mimetype,
        },
        project,
        assighnto,
        asignDate,
        team: team.map((file) => ({
          data: file.buffer,
          contentType: file.mimetype,
        })),
        priority,
        status,
        cost,
      });
      const result = await newUser.save();
      // console.log("result is ", result);
      res.status(200).json({ MESSAGE: "USER DOUMENT CREATED successfuly", result });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  userListGet: async (req, res) => {
    try {
      const found = await projectListSchema.find();
      console.log(found);
      if (!found) {
        res.status(400).json({ msg: "not found" });
      }
      res.status(200).json({ msg: "data reterived", projectListSchema: found });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  userListUpdate: async (req, res) => {
    try {
      const { project, priority, status } = req.body;
      const userID = req.query.id;
      const userListUpdate = await projectListSchema.findByIdAndUpdate(
        { _id: userID },
        { $set: { project, priority, status } },
        { new: true }
      );
      if (userListUpdate) {
        res.status(200).json({ MSG: "USER UPDATED" });
      } else {
        res.status(200).json({ MSG: "USER NOY FOUND UPDATED" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  userListDelete: async (req, res) => {
    try {
      const dellID = req.query.id;
      console.log("dellID", dellID);
      const userDelete = await projectListSchema.findByIdAndDelete({
        _id: dellID,
      });
      // console.log(userDelete);
      if (!userDelete) {
        res.status(200).json({ msg: "can't removed try again" });
      } res.status(200).json({ msg: "cleint removed" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
