const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.newUserAdded = functions.auth.user().onCreate((user) => {
  let currentTime = Date.now();

  const newUser = async () => {
    try {
      const createUser = admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          disabled: user.disabled,
          created: currentTime,
          createdBy: "Auto",
          useCreatedUsername: false,
          useAddressUsername: true,
          useENSusername: false,
          useENSdata: false,
          info: {
            username: "",
            avatar: "",
            email: "",
            url: "",
            description: "",
            discord: "",
            github: "",
            reddit: "",
            twitter: "",
            telegram: "",
          },
          collections: {
            created: [],
            contributing: [],
            watching: [],
          },
        });
      return createUser;
    } catch (err) {
      return err;
    }
  };
  return newUser();
});
