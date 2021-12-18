import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();
const userRef = collection(db, "users");

const LeaderboardPage = () => {
  const address = useLocation().pathname.replace("/leaderboard/", "");
  console.log("address : ", address);
  useEffect(() => {
    const checkUser = async () => {
      const q = query(userRef, where("userId", "==", address));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });
    };
    return checkUser();
  }, [address]);
  return <div>Leaderboard Page</div>;
};

export default LeaderboardPage;
