const { initializeApp } = require("firebase-admin/app");
const app = initializeApp({
  serviceAccountId: "communft-dnc@appspot.gserviceaccount.com",
});

module.exports = {
  // user login and creation
  ...require("./login/UserLogin"),
};
