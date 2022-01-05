import { Link } from "react-router-dom";
import { Button } from "@/components/elements";
import image from "./Pointers.png";

const Hero = () => {
  return (
    <div className="bg-primary-100">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-2/5 flex flex-col items-start mt-8 sm:mt-0">
          <h1 className="text-4xl lg:text-6xl leading-none mb-4">
            <strong className="text-gray-100">
              Create Art collections collaboratively
            </strong>
          </h1>
          <div className="flex gap-12 mt-4">
            <Link to="/playground">
              <Button size="2xl" color="white" weight="bold">
                Draw
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="2xl" color="white" weight="bold">
                Explore
              </Button>
            </Link>
          </div>
          <div className="my-4 text-gray-100 font-semibold">
            <div>* App is currently in Alpha *</div>
            <div className="pl-3">
              Please continue to check back as we test and develop
            </div>
          </div>
        </div>
        <div className="md:w-3/5">
          <img src={image} alt="Communft Example" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
