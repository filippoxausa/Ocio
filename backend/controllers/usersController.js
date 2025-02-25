import User from "../models/user.js";
const pathApiUsers = "/api/users/";

export const getUsers = async (req, res) => {
    try {
        let users = await User.find();
        users = users.map((user) => {
            return {
                self: pathApiUsers + user._id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error in user recovery" });
    }
};

export const getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user = {
            self: pathApiUsers + user._id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error in user recovery" });
    }
};

export const createUser = async (req, res) => {
    try {
        let user = new User(req.body);
        if (!user.email || typeof user.email !== 'string' || !validateEmail(user.email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        user = await user.save();
        let userId = user._id;
        res.location(pathApiUsers + userId)
            .status(201)
            .send();
    } catch (error) {
        res.status(400).json({ message: "Error in user creation" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const userIdFromToken = req.user.id;
        const userId = req.params.id;
        const { oldPassword, newPassword } = req.body;

        if (userIdFromToken !== userId) {
            return res.status(403).json({ success: false, message: "You cannot change another user's password" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password !== oldPassword) {
            return res.status(400).json({ success: false, message: "Incorrect old password" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role === "operator") {
            return res.status(403).json({ message: "You cannot delete an operator" });
        }
        await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error in user deletion" });
    }
};

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
