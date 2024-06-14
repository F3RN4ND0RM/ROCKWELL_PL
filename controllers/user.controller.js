const bcrypt = require("bcrypt");
const User = require("../models/users");
const ProdXUser = require("../models/prodXusers");
const Score = require("../models/score");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length <= 0) return res.status(404).json({ msg: "Not found" });

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        "rol",
        "first_name",
        "last_name",
        "company",
        "email",
        "max_score",
      ],
    });

    if (!user) return res.status(404).json({ msg: "Not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password_ } = req.body;

    const user = await User.findOne({
      where: {
        status: true,
        email: email,
      },
    });

    if (!user) return res.status(404).json({ msg: "wrong user or password" });

    validPassword = await bcrypt.compare(password_, user.password_);

    if (!validPassword)
      return res.status(404).json({ msg: "wrong user or password" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
        first_name: user.first_name,
        max_score: user.max_score,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    console.log(`Token generado: ${token}`);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    return res.status(200).json({ msg: "welcome" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  }
};

exports.postUser = async (req, res) => {
  let body = req.body;
  const salt = await bcrypt.genSalt(10);
  body.password_ = await bcrypt.hash(body.password_, salt);

  try {
    const user = await User.create(body);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          rol: user.rol,
          first_name: user.first_name,
          max_score: user.max_score,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
        sameSite: "strict", // Protects against CSRF attacks
        maxAge: 3600000, // 1 hour in milliseconds
      });

      return res.status(200).json({ msg: "User Created Succesfully" });
    }

    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0),
      path: "/",
    });
    res.status(200).send("Logged out successfully");
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", errores: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.body.id;

  try {
    // Delete or alter the entries in the prod_users table
    await ProdXUser.destroy({
      where: {
        user_id: userId,
      },
    });

    // Then delete the user
    const result = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).send("User deleted successfully");
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

exports.saveGame = async (req, res) => {
    try {
        const { levelsCompleted, pointsu } = req.body;
        const userId = req.user.id; // Extracted by the middleware

        // Validate the data
        if (points === undefined || !Array.isArray(levelsCompleted)) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        // Convert levelsCompleted array to string
        const levelsCompletedStr = JSON.stringify(levelsCompleted);


        // Save the data to the database
        const score = await Score.create({
            user_id: userId,
            path_: levelsCompletedStr, // Save levelsCompleted as string
            points: pointsu,
            date_: new Date() // Automatically set the current date and time
        });

        // Send a success response
        res.status(201).json(score);
    } catch (error) {
        console.error('Error saving game progress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
