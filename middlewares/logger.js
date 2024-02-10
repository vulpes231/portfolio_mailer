const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const eventLogger = async (message, fileName) => {
  const currentDate = format(new Date(), "yyyy/MM/dd");
  const logItem = `${currentDate}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const logFolder = path.join(__dirname, "../logs");
    const logFilePath = path.join(logFolder, fileName);
    if (!fs.existsSync(logFolder)) {
      await fsPromises.mkdir(logFolder);
    }

    await fsPromises.appendFile(logFilePath, logItem);
  } catch (error) {
    console.error(error);
  }
};

const requestLogger = (req, res, next) => {
  eventLogger(`${req.method}\t${req.headers.origin}\t${req.path}`, "req.txt");
  next();
};

const errorLogger = (err, req, res, next) => {
  eventLogger(`${err.stack}`, "error.txt");
  next();
};

module.exports = { eventLogger, requestLogger, errorLogger };
