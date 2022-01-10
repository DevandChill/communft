import { useEffect, useState } from "react";
import { Input, Button } from "@/components/elements";
import { UserENSCard } from "@/components/profile";

import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
const db = getFirestore();

const UserProfileEdit = ({ uid, closeEdit }) => {
  const [loading, setLoading] = useState(true);
  const [ensData, setEnsData] = useState(null);
  const [usernameSelect, setUsernameSelect] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [discordEdit, setDiscordEdit] = useState("");
  const [githubEdit, setGithubEdit] = useState("");
  const [twitterEdit, setTwitterEdit] = useState("");

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        setUsernameEdit(doc.data().username);
        setDiscordEdit(doc.data().discord);
        setGithubEdit(doc.data().github);
        setTwitterEdit(doc.data().twitter);
        setEnsData(doc.data().useENSdata);
        setUsernameSelect(doc.data().usernameSelect);
        setLoading(false);
        return () => unsub();
      });
    }
  }, [uid]);

  const handleUpdate = async () => {
    console.log("handleUpdate");
    await updateDoc(doc(db, "users", uid), {
      username: usernameEdit,
      discord: discordEdit,
      github: githubEdit,
      twitter: twitterEdit,
      usernameSelect: usernameSelect,
      useENSdata: ensData,
    }).then(() => {
      closeEdit();
    });
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex my-8 p-4 border">
            <div>
              <div className="font-semibold text-gray-700 pb-2">INFO</div>
              <fieldset className="space-y-5">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="ens"
                      aria-describedby="ens-info"
                      name="info"
                      type="radio"
                      checked={ensData}
                      onChange={() => setEnsData(true)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ens" className="font-medium text-gray-700">
                      Use ENS Info
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="stored"
                      aria-describedby="stored-info"
                      name="info"
                      type="radio"
                      checked={!ensData}
                      onChange={() => setEnsData(false)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="stored"
                      className="font-medium text-gray-700"
                    >
                      Use Stored Info
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="ml-16">
              <div className="font-semibold text-gray-700 pb-2">USERNAME</div>
              <fieldset>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="address"
                      aria-describedby="address-username"
                      name="username"
                      type="radio"
                      checked={usernameSelect === "address"}
                      onChange={() => setUsernameSelect("address")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="address"
                      className="font-medium text-gray-700"
                    >
                      Use Address for Username
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="created"
                      aria-describedby="created-username"
                      name="username"
                      type="radio"
                      checked={usernameSelect === "created"}
                      onChange={() => setUsernameSelect("created")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="created"
                      className="font-medium text-gray-700"
                    >
                      Use Created Username
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="eth"
                      aria-describedby="eth-username"
                      name="username"
                      type="radio"
                      checked={usernameSelect === "eth"}
                      onChange={() => setUsernameSelect("eth")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="eth" className="font-medium text-gray-700">
                      Use ETH for Username
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="border p-4">
            {ensData ? (
              <UserENSCard />
            ) : (
              <div>
                <div className="p-4 text-center text-gray-700 font-semibold text-2xl">
                  Stored Info
                </div>
                <div>
                  <Input
                    id="username"
                    label="Username"
                    type="text"
                    value={usernameEdit}
                    onChange={(e) => setUsernameEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    label="Discord"
                    type="text"
                    value={discordEdit}
                    onChange={(e) => setDiscordEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    label="Github"
                    type="text"
                    value={githubEdit}
                    onChange={(e) => setGithubEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    label="Twitter"
                    type="text"
                    value={twitterEdit}
                    onChange={(e) => setTwitterEdit(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="my-4">
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
};

export default UserProfileEdit;
