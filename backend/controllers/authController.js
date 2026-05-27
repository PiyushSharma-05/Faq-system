const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../data/users.json"
);

const loginUser = (req, res) => {

  const users =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const user = users.find(
    (u) =>
      u.username === req.body.username &&
      u.password === req.body.password
  );

  if (!user) {

    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    id: user.id,
    username: user.username,
    role: user.role
  });
};

module.exports = { loginUser };