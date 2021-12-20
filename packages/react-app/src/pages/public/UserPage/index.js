import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEnsData } from "@/hooks/useEnsData";
import { ethers } from "ethers";
import Davatar from "@davatar/react";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const address = useLocation().pathname.replace("/user/", "");

  // const address = "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5"; //nick.eth
  const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    provider
      .lookupAddress(address)
      .then((ensName) => {
        if (ensName) {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(null);
      });
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Loading...
      </div>
    );
  } else if (loading === false) {
    return (
      <div>
        <div className="m-8">
          <div className="flex">
            <Davatar size={120} provider={provider} address={address} />

            <div className="p-12 font-semibold text-gray-700 text-3xl">
              {name}
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
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Invaild User Address
      </div>
    );
  }
};

export default UserPage;
