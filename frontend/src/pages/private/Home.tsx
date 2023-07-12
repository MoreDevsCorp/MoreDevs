import Feed from "../../components/Feed";
import CreatePost from "../../components/ui/create-post/CreatePost";
import { Post as PostType } from "../../types";

interface HomeProps {
  feed: PostType[] | undefined;
  refetch: () => void;
}

const Home = ({ feed, refetch }: HomeProps) => {
  return (
    <div className=" w-full p-2 ">
      <div className="max-w-[700px] space-y-5">
        <CreatePost />
        {/* <Post /> */}
        <Feed refetch={refetch} feed={feed} />
      </div>
    </div>
  );
};

export default Home;
