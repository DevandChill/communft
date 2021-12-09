const admin = require("firebase-admin");
admin.initializeApp();

module.exports = {
  // user login and creation
  ...require("./login/UserLogin"),
};
