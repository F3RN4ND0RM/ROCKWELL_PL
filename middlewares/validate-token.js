
const jwt = require("jsonwebtoken");
const User = require("../models/users");

function validateToken(req, res, next) {
    const token = req.cookies.authToken;

    //Checks if there is token
    if (!token) return res.status(403).json({ message: "Not authenticated" });

    //Verifies jwt token
    jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    //Verifies user of the token status
    User.findOne({ where: { id: user.id } })
        .then((userFromDb) => {
            if (userFromDb && userFromDb.status) {
            req.user = user;  //returns user data
            next();
            } else {
                res.status(403).json({ message: "Account deactivated" }); //account is no longer active
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" }); //internal server error
        });
    });
}

module.exports = { validateToken };
