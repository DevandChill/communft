// import image from "./logo192.png";

const LogoImage = ({ size }) => {
  // const logoSrc = image;
  const logoSrc = "";

  const altTag = "";
  return (
    <div className="flex-shrink-0">
      {size ? (
        <img className={`h-${size} w-${size}`} src={logoSrc} alt={altTag} />
      ) : (
        <img className="h-10 w-10" src={logoSrc} alt={altTag} />
      )}
    </div>
  );
};

export default LogoImage;
