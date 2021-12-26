import { Link } from "react-router-dom";
import { Button } from "@/components/elements";

const CreatePage = () => {
  return (
    <div>
      <h1>Create Page</h1>
      <div>Login to create a Collection and collaborate with others!</div>
      <div>
        <div>Or continue the playground</div>
        {/* <Link to="/playground"> */}
        <Link to="/app/design">
          <Button>Playground</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePage;
