import { useEffect, useState } from "react";
export const useEnsData = ({ provider, address }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [discord, setDiscord] = useState("");
  const [github, setGithub] = useState("");
  const [reddit, setReddit] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    if (!!provider && !!address) {
      // console.log("useENSData");
      provider
        .lookupAddress(address)
        .then((ensName) => {
          if (ensName) {
            setName(ensName);
            provider.getResolver(ensName).then((resolver) => {
              resolver.getText("avatar").then((avatar) => {
                if (avatar && avatar.length > 0) {
                  setAvatar(avatar);
                }
              });
              resolver.getText("email").then((email) => {
                if (email && email.length > 0) {
                  setEmail(email);
                }
              });
              resolver.getText("url").then((url) => {
                if (url && url.length > 0) {
                  setUrl(url);
                }
              });
              resolver.getText("description").then((description) => {
                if (description && description.length > 0) {
                  setDescription(description);
                }
              });
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
              resolver.getText("com.reddit").then((reddit) => {
                if (reddit && reddit.length > 0) {
                  setReddit(reddit);
                }
              });
              resolver.getText("com.twitter").then((twitter) => {
                if (twitter && twitter.length > 0) {
                  setTwitter(twitter);
                }
              });
              resolver.getText("org.telegram").then((telegram) => {
                if (telegram && telegram.length > 0) {
                  setTelegram(telegram);
                }
              });
            });
          }
        })
        .catch(() => {
          return;
        });
    }
  }, [address, provider]);
  return {
    name,
    avatar,
    email,
    url,
    description,
    discord,
    github,
    reddit,
    twitter,
    telegram,
  };
};

export default useEnsData;
