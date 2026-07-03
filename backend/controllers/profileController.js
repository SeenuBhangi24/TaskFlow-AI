const User = require("../models/User");

// ==============================
// Get User Profile
// ==============================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {

            return res.status(404).json({

                message: "User Not Found",

            });

        }

        res.status(200).json(user);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

module.exports = {

    getProfile,

};