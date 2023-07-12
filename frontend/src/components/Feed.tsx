import Post from "./ui/post";
import { Post as PostType } from "../types";

interface FeedProps {
  feed: PostType[] | undefined;
  refetch: () => void;
}

const Feed: React.FC<FeedProps> = ({ feed, refetch }) => {
  return (
    <section>
      <div className="flex flex-col gap-5">
        {feed?.map((post) => {
          return <Post key={post.id} post={post} refetch={refetch} />;
        })}
      </div>
    </section>
  );
};
export default Feed;
