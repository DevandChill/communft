import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const db = getFirestore();

export const useUserPublicData = (userId) => {
  const [username, setUsername] = useState(null);
  const [userJoined, setUserJoined] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [discord, setDiscord] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [userAccount, setUserAccount] = useState(null);

  const getENSUsername = useCallback((address, ensData) => {
    const provider = ethers.getDefaultProvider();

    provider
      .lookupAddress(address)
      .then((ensName) => {
        if (ensName) {
          setUsername(ensName);
          if (ensData) getENSData(ensName, address);
        } else {
          setUsername(address);
        }
      })
      .catch(() => {
        return;
      });
  }, []);

  const getENSData = async (ensName, address) => {
    if (ensName) {
      setAvatar(address);
      const provider = ethers.getDefaultProvider();
      provider
        .getResolver(ensName)
        .then((resolver) => {
          resolver.getText("com.discord").then((discord) => {
            if (discord && discord.length > 0) {
              setDiscord(discord);
            }
          });
          resolver.getText("com.github").then((github) => {
            if (github && github.length > 0) {
              setGithub(github);
            }
          });
          resolver.getText("com.twitter").then((twitter) => {
            if (twitter && twitter.length > 0) {
              setTwitter(twitter);
            }
          });
        })
        .catch(() => {
          // if invalid ensName set to invalid for response
          setUserAccount("invalid");
          return;
        });
    }
  };

  const firebaseData = (data) => {
    if (data) {
      setUserJoined(data.created);
      setDiscord(data.discord);
      setGithub(data.github);
      setTwitter(data.twitter);
      if (data.avatar) {
        setAvatar(data.avatar);
      } else {
        setAvatar(data.uid);
      }
    }
  };

  useEffect(() => {
    if (userId.includes("0x") && userId.length === 42) {
      // check if userId is a valid address
      const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
        if (!doc.data()) {
          setUserAccount(false);
          getENSUsername(userId, true);
          return;
        } else {
          setUserAccount(true);
          // check user prefernce for username
          if (doc.data().useAddressUsername) {
            // if user preference is to use address as username
            setUsername(userId);
          } else if (doc.data().useCreatedUsername) {
            // if user preference is to use created username
            setUsername(doc.data().username);
          } else {
            // if user preference is to use ens username
            getENSUsername(userId);
          }
          // check user prefernce for public display of data
          if (doc.data().useENSdata) {
            // if user preference is to use ens data
            getENSUsername(userId, true);
          } else {
            // if user preference is to use firebase data
            firebaseData(doc.data());
          }
        }
        return () => unsub();
      });
    } else if (userId.includes(".eth")) {
      // check if userId is a valid eth address
      setUsername(userId);
      getENSData(userId);
    } else {
      // check if userId is a valid username
      const userRef = collection(db, "users");
      const checkUser = async () => {
        const q = query(userRef, where("username", "==", userId));
        const querySnapshot = await getDocs(q);
        let data = null;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data = doc.data();
        });
        if (data) {
          // if user exists in firebase
          setUserAccount(true);
          setUsername(userId);
          firebaseData(data);
        } else {
          // if user does not exist in firebase
          setUserAccount("invalid");
        }
      };
      checkUser();
    }
  }, [userId, getENSUsername]);

  return {
    userAccount,
    userJoined,
    username,
    avatar,
    discord,
    github,
    twitter,
  };
};

export default useUserPublicData;
