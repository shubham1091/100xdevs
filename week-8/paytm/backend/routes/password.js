const { Router } = require("express");

const route = Router();

route.post("/reset/request", async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = user.generateResetToken();
        await user.save();

        // You can send the resetToken to the user's email here if needed

        res.json({ message: "Reset token generated", token: resetToken });
    } catch (error) {
        console.error("Error initiating password reset:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.post("/reset", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by reset token
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        // Update user's password and clear reset token
        user.password = newPassword;
        user.resetToken = null;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
