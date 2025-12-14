import crypto from 'crypto';

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        
        const resetUrl = `http://{}/reset-password/${resetToken}`;

        res.json({
            success: true,
            message: `Password reset link sent to ${email}`,
            resetUrl 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
