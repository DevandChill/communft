const functions = require("firebase-functions");
const admin = require("firebase-admin");

const userCreateCollection = functions.https.onCall((data, context) => {
  if (!context.auth && !context.auth.uid) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  let date = Date.now();
  const collectionRef = admin
    .firestore()
    .collection("collections")
    .add({
      name: data.name,
      description: data.description || "",
      owner: context.auth.uid,
      access: data.access,
      type: data.type || "",
      traits: data.traits || [],
      collectionImgUrl: data.collectionImgUrl || "",
      templateImgUrl: data.templateImgUrl || "",
      created: date,
      updated: date,
    })
    .then((response) => {
      admin
        .firestore()
        .collection("users")
        .doc(context.auth.uid)
        .collection("collections")
        .doc(response.id)
        .set({
          collectionId: response.id,
          created: date,
          updated: date,
          role: "owner",
        });
      return "success";
    })
    .catch((err) => {
      return err;
    });
  return collectionRef;
});

module.exports = {
  userCreateCollection,
};
