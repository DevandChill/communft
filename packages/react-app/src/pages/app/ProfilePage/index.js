import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button } from "@/components/elements";
import { cardFormatDate } from "@/utils/formatDate";
import { useEnsData } from "@/hooks/useEnsData";
import { ethers } from "ethers";

import Davatar from "@davatar/react";

import { getFirestore, doc, onSnapshot } from "firebase/firestore";
const db = getFirestore();

const ProfilePage = ({ currentUser }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});
  const [user, setUser] = useState({});

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

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        setUser(doc.data());
        console.log(doc.data());
        return () => unsub();
      });
    }
  }, [uid]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const getAccount = async () => {
      const accounts = await provider.listAccounts();
      setAddress(accounts[0]);
    };
    return getAccount();
  }, []);

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
          {user.uid && (
            <div className="border">
              <div>edit form</div>
              <div>
                <Input
                  id="username"
                  title="Username"
                  type="text"
                  placeholder={user.info.username}
                />
              </div>
              <div>
                <Input
                  id="username"
                  title="Discord"
                  type="text"
                  placeholder={user.info.discord}
                />
              </div>
              <div>
                <Input
                  id="username"
                  title="Github"
                  type="text"
                  placeholder={user.info.github}
                />
              </div>
              <div>
                <Input
                  id="username"
                  title="Twitter"
                  type="text"
                  placeholder={user.info.twitter}
                />
              </div>
              <div className="my-4">
                <Button>Update</Button>
              </div>
            </div>
          )}

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
                  <div>Username : {user.info.username}</div>
                  <div>Email: {user.info.email}</div>
                  <div>URL: {user.info.url}</div>
                  <div>Description: {user.info.description}</div>
                  <div>Discord: {user.info.discord}</div>
                  <div>Github: {user.info.github}</div>
                  <div>Reddit: {user.info.reddit}</div>
                  <div>Twitter: {user.info.twitter}</div>
                  <div>Telegram: {user.info.telegram}</div>
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
