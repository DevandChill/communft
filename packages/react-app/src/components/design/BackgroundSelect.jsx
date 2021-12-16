import { useState } from "react";
import trans_bg_100 from "@/components/backgrounds/transparent-bg-100.png";
import { UserIcon } from "@/components/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BackgroundSelect = (props) => {
  const [background, setBackground] = useState("bg-white");
  const [backgroundImage, setBackgroundImage] = useState(false);
  return (
    <div className="my-4">
      <div className="flex justify-end">
        <div
          className={classNames(
            background === "bg-white" ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackground("bg-white");
            props.background("bg-white");
          }}
        ></div>

        <div
          className={classNames(
            background === "bg-black" ? " border-blue-500" : "border-black",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-black"
          )}
          onClick={() => {
            setBackground("bg-black");
            props.background("bg-black");
          }}
        ></div>

        <div
          className={classNames(
            background === "transparent" ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackground("transparent");
            props.background("transparent");
          }}
        >
          <div
            className="h-9 w-9 rounded"
            style={{
              background: `url(${trans_bg_100}) no-repeat`,
            }}
          />
        </div>

        <div
          className={classNames(
            backgroundImage ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackgroundImage(!backgroundImage);
            props.backagroundImage(!backgroundImage);
          }}
        >
          <UserIcon size="9" />
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelect;
