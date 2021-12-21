import { useEnsData } from "@/hooks/useEnsData";
import { ethers } from "ethers";

const UserENSCard = (uid) => {
  const provider = ethers.getDefaultProvider();
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
    address: uid,
  });
  return (
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
  );
};
export default UserENSCard;
