const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: "No Token Found",
            });

        }

        // Remove "Bearer " from the token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store Logged-in User
        req.user = decoded;

        next();

    }

    catch (error) {

        console.log(error);

        res.status(401).json({
            message: "Invalid Token",
        });

    }

};

module.exports = protect;