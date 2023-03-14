const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constantas");

exports.getUsers = async (req, res) => {
  try {
    const response = await db.query("select user_id,email from users");
    return res.status(200).json({
      success: true,
      users: response.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const response = await db.query(
      "INSERT INTO users (email,password) values($1,$2) RETURNING *",
      [email, hashedPassword]
    );
    return res.status(201).json({
      success: true,
      message: "the registration was succefull",
    });
    console.log("validation passed");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  let payload = {
    id: user.user_id,
    email: user.email,
  };
  try {
    const token = await sign(payload, SECRET);
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ success: true, message: "logged in succefuly" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .json({ success: true, message: "logged out  succefuly" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
