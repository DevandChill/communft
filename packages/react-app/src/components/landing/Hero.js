import { Button } from "@/components/elements";

const Hero = () => {
  return (
    <div>
      <div className="container mx-auto px-6 sm:px-12 flex flex-col-reverse sm:flex-row items-center">
        <div className="sm:w-2/5 flex flex-col items-start mt-8 sm:mt-0">
          <h1 className="text-4xl lg:text-6xl leading-none mb-4">
            <strong className="font-black">
              Create Art collections collaboratively
            </strong>
          </h1>
          <div className="flex gap-8">
            <Button width="half" size="xl">
              Draw
            </Button>
            <Button width="half" size="xl">
              Explore
            </Button>
          </div>
        </div>
        <div className="sm:w-3/5 border-2 h-36"></div>
      </div>
    </div>
  );
};

export default Hero;
