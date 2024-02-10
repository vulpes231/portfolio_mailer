const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { corsOptions } = require("./configs/corsOptions");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { connectDB } = require("./configs/connectDB");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(requestLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/send", require("./routes/sendmail"));
app.use("/", require("./routes/root"));

app.use(errorLogger);

let server; // Define server variable outside the scope of the callback

mongoose.connection.once("open", () => {
  console.log("Connected to database");

  server = app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nGracefully shutting down server...");

  if (server) {
    server.close(() => {
      console.log("Express server closed");

      mongoose.connection.close();
      console.log("MongoDB connection closed");

      process.exit(0);
    });
  } else {
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  }
});
