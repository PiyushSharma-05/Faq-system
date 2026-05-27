const express = require("express");
const cors = require("cors");

const questionRoutes =
  require("./routes/questionRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/questions",
  questionRoutes
);

app.get("/", (req, res) => {
  res.send(
    "FAQ Backend Running"
  );
});
const authRoutes =
require("./routes/authRoutes");

app.use(
  "/auth",
  authRoutes
);

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});