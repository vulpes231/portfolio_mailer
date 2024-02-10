const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { corsOptions } = require("./configs/corsOptions");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
// console.log("Used the logger");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/", require("./routes/root"));

app.use(errorLogger);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
