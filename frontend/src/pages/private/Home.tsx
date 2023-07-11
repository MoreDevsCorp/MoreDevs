import CreatePost from "../../components/ui/create-post/CreatePost";
import Post from "../../components/ui/post";

const Home: React.FC = () => {
  return (
    <div className=" w-full p-2 ">
      <div className="max-w-[700px] space-y-5">
        <CreatePost />
        {/* <Post /> */}
      </div>
    </div>
  );
};

export default Home;
