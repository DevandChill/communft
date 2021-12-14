import { Link } from "react-router-dom";
import { Button } from "@/components/elements";

const CreateCollectionPage = () => {
  return (
    <div>
      <div>Create Collection Page</div>
      <div>
        <Link to="/app/design">
          <Button>Design</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateCollectionPage;
