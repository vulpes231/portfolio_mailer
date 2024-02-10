const { allowedOrigins } = require("../configs/allowedOrigins");

var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed!"));
    }
  },
};

module.exports = { corsOptions };
