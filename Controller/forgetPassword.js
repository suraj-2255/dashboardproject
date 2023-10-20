const userSchema = require("../model/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateResetToken() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

module.exports = {
    forgetPassword: async (req, res) => {
        const { Email } = req.body;
        console.log(Email)
        try {
            const user = await userSchema.findOne({ Email });
            console.log("user", user);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const resetToken = generateResetToken();
            const expiration = new Date(Date.now() + 360000000000);

            user.token = resetToken;
            user.tokenExpiration = expiration;
            await user.save();

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: "soorajyadav9838961676@gmail.com",
                    pass: "btrgsdcgclntrjfw",
                },
            });
            const mailOptions = {
                from: "soorajyadav9838961676@gmail.com",
                to: Email,
                subject: "Password Reset Request",
                html: `Click the following link : <a href="http://localhost:3000/reset?token=${resetToken}">Reset Password</a>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Error sending email" }); f
                }
                console.log("Email sent:", info.response);
                res.json({
                    message: "Password reset token sent to your email",
                    token: resetToken,
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { Email, token, newPassword, confirmPassword } = req.body;
            console.log("token", token);
            console.log("confirmPassword", confirmPassword)
            const user = await userSchema.findOne({ Email });
            console.log("user", user);
            if (!user || user.token !== token || user.tokenExpiration < new Date()) {
                return res.status(404).json({ message: "Invalid token or expired" });
            }
            if (newPassword != confirmPassword) {
                res.status(200).json({ message: "password are not same" })
            } else {
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);
                console.log("hashPassword", hashPassword);
                user.Password = hashPassword;
                user.token = null;
                await user.save();
                res.status(200).json({ message: "password reset successful" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    },
};
