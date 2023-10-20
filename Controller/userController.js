const userschema = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const secretKey = "this is my secret key";
const bcrypt = require("bcrypt");

module.exports = {
  userCreate: async (req, res) => {
    try {
      const { FirstName, LastName, Mobile, Email, Password, confirmPassword } =
        req.body;
      const email = await userschema.findOne({ Email: Email });
      if (email) {
        res.staus(400).json({ message: "User Already Exist" });
      } else {
        if (Password != confirmPassword) {
          res.status(400).json("confirm password dont match");
        } else {
          const hashPassword = await bcrypt.hash(Password, 10);
          const user_Create = new userschema({
            FirstName: FirstName,
            LastName: LastName,
            Mobile: Mobile,
            Email: Email,
            Password: hashPassword,
          });
          const userResult = await user_Create.save();
          const token = jwt.sign({ email: user_Create.Email }, secretKey);

          res.json({
            msg: "New User Created",
            token,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  userLogin: async (req, res) => {
    try {
      const Email = req.body.Email;
      const userPassword = req.body.Password;
      const userFound = await userschema.findOne({ Email: Email });
      if (userFound) {
        const isMatch = await bcrypt.compare(userPassword, userFound.Password);
        if (isMatch) {
          const token = jwt.sign({ Email: Email, id: userFound.id }, secretKey);
          res.status(200).json({
            msg: "Login sucessfull",
            token
          });
        } else {
          res.json({ msg: "email or password invalid" });
        }
      } else {
        res.status(404).json({ msg: "User Not Exist" });
      }
    } catch (error) {
      res.status(500).send("invalid login detaild");
    }
  },
  userExpUpdate: async (req, res) => {
    const { Education, Skills, Experience } = req.body;
    const Email = req.user.email;
    const id = req.user.id;
    try {
      const found = await userschema.findOneAndUpdate(
        { Email: Email },
        {
          $set: {
            Education: Education,
            Skills: Skills,
            Experience: Experience,
          },
        },
        { new: true }
      );
      if (found) {
        res.json({ msg: "Data Updated" });
      } else {
        res.json({ msg: "not updated" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  userInfoUpdate: async (req, res) => {
    const { FirstName, LastName, newEmail, Mobile } = req.body;
    const myEmail = req.user.email;
    const id = req.user.id;
    try {
      const userInfoUpdate = await userschema.findOneAndUpdate(
        { Email: myEmail },
        {
          $set: {
            FirstName: FirstName,
            LastName: LastName,
            Email: newEmail,
            Mobile: Mobile,
          },
        },
        { new: true }
      );
      console.log(userInfoUpdate);
      if (userInfoUpdate) {
        res
          .status(200)
          .json({ msg: "user Info Updated" });
      } else {
        res.status(404).json({ msg: "User Not Found" });
      }
    } catch (error) {
      res.status(500).send("internal error info Update");
    }
  },
  userDelete: async (req, res) => {
    const Email = req.user.email;
    try {
      const deleteUser = await userschema.findOneAndDelete({ Email: Email });
      if (deleteUser) {
        res.status(200).json({ msg: "User Deleted" });
      } else {
        res.status(404).json({ msg: "User Not Found" });
      }
    } catch (error) {
      res.status(500).send("internal error");
    }
  },
  userDataGet: async (req, res) => {
    try {
      const found = await userschema.find()
      if (found) {
        res.status(200).json({ msg: "all data reterived", user_detail: found })
      } else {
        res.status(200).json({ msg: 'user not found' })
      }
    } catch (error) { res.status(500).json({ msg: error.message }) }
  }
};