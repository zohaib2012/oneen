
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { usershm } from "../model/user.model.js";
config();

// register user
export let registeruser = async (req, res) => {
    try {
        let { email, password } = req.body;
        const existingUser = await usershm.findOne({ email });

        if (existingUser) {
            console.log("user already exist");
            return res.status(400).json({ message: "User already exists" });
        }

        // Add password validation with regex
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
            });
        }

        let hashedpassword = await bcrypt.hash(password, 10);



        // let newusershm = await pending_user_shm.create({
        let newusershm = await usershm.create({
            email,
            password: hashedpassword
        });



        return res.status(200).json({
            message: "User send request successfully", newusershm


        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });

    }
};

// login user
export let loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await usershm.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User not found, please register first" });
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!process.env.secretkey) {
            console.error("Secret Key not found in .env");
            return res.status(500).json({ message: "Secret Key not found!" });
        }

        const logintoken = jwt.sign({ _id: user._id }, process.env.secretkey, {
            expiresIn: "7d",
        });

        res.cookie("logintoken", logintoken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({ message: "Login successful", user, logintoken });
    } catch (error) {
        console.log("Error in loginuser function:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// logout user
export let logoutuser = async (req, res) => {
    try {
        res.clearCookie("logintoken", {
            httpOnly: true,
            secure: true,

        })
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};








// forget password
export const forgetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Add password validation with regex
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!strongPasswordRegex.test(newPassword)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
            });
        }

        let user = await usershm.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "user not found register first" });
        }

        let hashedpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedpassword;
        await user.save();

        return res.status(200).json({ message: "password update sucessfully" });
    } catch (error) {
        console.log(error);
    }
};
// update password
export const updatepassword = async (req, res) => {
    try {
        let { password, updatedPassword, userId } = req.body;

        // Add password validation with regex
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!strongPasswordRegex.test(updatedPassword)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
            });
        }

        let data = await usershm.findById(userId);
        if (!data) {
            return res.status(400).json({ message: "data  not found" });
        }

        let isMatched = await bcrypt.compare(password, data.password);

        if (!isMatched) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        let hashedpassword = await bcrypt.hash(updatedPassword, 10);

        data.password = hashedpassword;
        await data.save();
        return res.status(200).json({ message: "password updated sucessfully" });
    } catch (error) {
        console.log(error);
    }
};

