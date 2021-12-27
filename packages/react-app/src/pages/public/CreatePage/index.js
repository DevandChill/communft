import { Link } from "react-router-dom";
import { Button } from "@/components/elements";

const CreatePage = () => {
  return (
    <div>
      <div className="my-8 text-center text-3xl text-gray-700 font-bold">
        Create
      </div>
      <div className="my-8 text-center text-xl text-gray-700 font-semibold">
        <div className="my-8">
          Login to create a Collection and collaborate with others!
        </div>
        <div className="my-4">Or continue the playground</div>
        {/* <Link to="/playground"> */}
        <Link to="/app/design">
          <Button>Playground</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePage;
