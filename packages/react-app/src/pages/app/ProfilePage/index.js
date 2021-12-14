import { useEffect, useState } from "react";
import { useEnsData } from "@/hooks/useEnsData";
import { ethers } from "ethers";

import Davatar from "@davatar/react";

const ProfilePage = () => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});

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

  return (
    <div className="">
      <div>
        <div className="m-8">
          <div className="flex">
            {address && (
              <Davatar size={120} provider={provider} address={address} />
            )}

            <div className="p-12 font-semibold text-gray-700 text-3xl">
              ENS Name : {name}
            </div>
          </div>
          <div>Email: {email}</div>
          <div>URL: {url}</div>
          <div>Description: {description}</div>
          <div>Discord: {discord}</div>
          <div>Github: {github}</div>
          <div>Reddit: {reddit}</div>
          <div>Twitter: {twitter}</div>
          <div>Telegram: {telegram}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
