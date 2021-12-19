import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button } from "@/components/elements";
import { cardFormatDate } from "@/utils/formatDate";
import { useEnsData } from "@/hooks/useEnsData";
import { ethers } from "ethers";

import Davatar from "@davatar/react";

import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
const db = getFirestore();

const ProfilePage = ({ currentUser }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});

  const { uid } = currentUser;

  const {
    name,
    email,
    url,
    description,
    discord,
    github,
    reddit,
    twitter,
    telegram,
  } = useEnsData({
    provider: provider,
    address,
  });

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const getAccount = async () => {
      const accounts = await provider.listAccounts();
      setAddress(accounts[0]);
    };
    return getAccount();
  }, []);

  const [user, setUser] = useState({});
  const [usernameEdit, setUsernameEdit] = useState("");
  const [discordEdit, setDiscordEdit] = useState("");
  const [githubEdit, setGithubEdit] = useState("");
  const [twitterEdit, setTwitterEdit] = useState("");

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        setUser(doc.data());
        setUsernameEdit(doc.data().username);
        setDiscordEdit(doc.data().discord);
        setGithubEdit(doc.data().github);
        setTwitterEdit(doc.data().twitter);
        // console.log(doc.data());
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
    });
  };

  return (
    <div className="">
      <div>
        <div className="m-8">
          <div className="flex">
            {address && (
              <Davatar size={120} provider={provider} address={address} />
            )}

            {user.uid && (
              <div className="font-semibold text-gray-700">
                <div className="p-12 text-3xl">
                  {user.useAddressUsername ? (
                    <span>Username : {user.uid}</span>
                  ) : user.useCreatedUsername ? (
                    <span>Username : {user.username}</span>
                  ) : user.useENSusername ? (
                    <span>ENS Name : {name}</span>
                  ) : (
                    <span>Username : ERROR</span>
                  )}
                </div>
                <div>Joined : {cardFormatDate(user.created)}</div>
              </div>
            )}
          </div>

          <div className="flex my-8">
            <div>
              <fieldset className="space-y-5">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700"
                    >
                      Use ENS Data
                    </label>
                    <span
                      id="comments-description"
                      className="text-gray-500"
                    ></span>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="candidates"
                      aria-describedby="candidates-description"
                      name="candidates"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-700"
                    >
                      Use Edited Data
                    </label>
                    <span
                      id="candidates-description"
                      className="text-gray-500"
                    ></span>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="ml-16">
              <fieldset>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Use Address for Username
                    </label>
                    <span
                      id="offers-description"
                      className="text-gray-500"
                    ></span>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Use Created Username
                    </label>
                    <span
                      id="offers-description"
                      className="text-gray-500"
                    ></span>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      aria-describedby="offers-description"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Use ETH for Username
                    </label>
                    <span
                      id="offers-description"
                      className="text-gray-500"
                    ></span>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div>
            {user.uid && (
              <div className="border">
                <div>edit form</div>
                <div>
                  <Input
                    id="username"
                    title="Username"
                    type="text"
                    value={usernameEdit}
                    onChange={(e) => setUsernameEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    title="Discord"
                    type="text"
                    value={discordEdit}
                    onChange={(e) => setDiscordEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    title="Github"
                    type="text"
                    value={githubEdit}
                    onChange={(e) => setGithubEdit(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="username"
                    title="Twitter"
                    type="text"
                    value={twitterEdit}
                    onChange={(e) => setTwitterEdit(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <Button onClick={handleUpdate}>Update</Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 mt-4 border">
            <div className="border">
              <div className="text-xl font-semibold">ENS Info</div>
              <div>ENS Name : {name}</div>
              <div>Email: {email}</div>
              <div>URL: {url}</div>
              <div>Description: {description}</div>
              <div>Discord: {discord}</div>
              <div>Github: {github}</div>
              <div>Reddit: {reddit}</div>
              <div>Twitter: {twitter}</div>
              <div>Telegram: {telegram}</div>
            </div>
            <div className="border">
              <div className="text-xl font-semibold">Firebase Info</div>
              {user.uid && (
                <div>
                  <div>Username : {user.username}</div>
                  <div>Email: {user.email}</div>
                  <div>URL: {user.url}</div>
                  <div>Description: {user.description}</div>
                  <div>Discord: {user.discord}</div>
                  <div>Github: {user.github}</div>
                  {/* <div>Reddit: {user.reddit}</div> */}
                  <div>Twitter: {user.twitter}</div>
                  {/* <div>Telegram: {user.telegram}</div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);
