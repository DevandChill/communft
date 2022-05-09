import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  CustomSwitch,
  CheckList,
  DatePicker,
} from "@/components/elements";

// import {
//   getFirestore,
//   collection,
//   query,
//   onSnapshot,
//   getDocs,
//   orderBy,
// } from "firebase/firestore";

import { getFunctions, httpsCallable } from "firebase/functions";

// const db = getFirestore();
const functions = getFunctions();

export const CreateCollectionPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState(true);
  const [accessType, setAccessType] = useState("public");
  const [traits, setTraits] = useState([]);

  // const [traitsList, setTraitsList] = useState([]);
  // const [blankTraitsList, setBlankTraitsList] = useState([]);
  const avatarTraitsList = [
    "eyes",
    "hair",
    "nose",
    "mouth",
    "ears",
    "skin",
    "accessories",
  ];

  // const [collections, setCollections] = useState([]);

  useEffect(() => {
    // const q = query(collection(db, "users"));
    // const querySnapshot = getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // return querySnapshot;
    // const q = query(collection(db, "users"), orderBy("created", "desc"));
    // const querySnapshot = getDocs(q);
    // // let users = [];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // users.push(doc.data());
    //   console.log(doc.data())
    // });
    //  const unsub = getDocs(q, (querySnapshot) => {
    // const q = query(collection(db, "something"));
    // const unsub = onSnapshot(q, (querySnapshot) =>
    //   querySnapshot.forEach((doc) => {
    //     console.log("doc here");
    //     console.log(doc.data());
    //   })
    // );
    // return unsub;
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await httpsCallable(
      functions,
      "userCreateCollection"
    )({
      name,
      description,
      access: accessType,
      traits,
      category: "avatar",
      collectionImgUrl: "",
      templateImgUrl: "",
      totalNfts: 0,
      // projectEndDate:
    });
    console.log(result);
  };

  useEffect(() => {
    if (access) {
      setAccessType("public");
    } else {
      setAccessType("private");
    }
  }, [access]);

  return (
    <div>
      <div className="text-center text-3xl text-gray-700 font-bold my-8">
        Create A Project
      </div>
      <div className="m-8">
        <form onSubmit={handleCreate}>
          <Input
            label="Project Name"
            placeholder="Project Name"
            className="my-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Project Description"
            placeholder="Project Description"
            className="my-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <CustomSwitch
            labelFalse="private"
            labelTrue="public"
            value={access}
            onChange={(val) => setAccess(val)}
          />
          <CheckList
            items={avatarTraitsList}
            emitSelected={(val) => setTraits(val)}
          />

          <DatePicker title="Project Finish Date" />

          <div className="my-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
      <div className="text-center text-3xl text-gray-700 font-bold my-8">
        View Your Projects
      </div>
      <div>view</div>
      <div>
        <div></div>
        <Link to="/app/design">
          <Button>Design</Button>
        </Link>
      </div>
    </div>
  );
};
