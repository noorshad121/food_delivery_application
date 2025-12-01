import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Password is wrong, try again" });
        }

        const token = createToken(user._id);

        res.json({
            success: true,
            message: `Welcome to the page ${user.name}`,
            token
        });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "User login error", error: err });
    }
};

// user register
const registerUser = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(403).json({
                success: false,
                message: "User already exists in database"
            });
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success: true,
            message: `You are successfully registered ${name}`,
            token
        });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error", error: err.message });
    }
};

export { loginUser, registerUser };
