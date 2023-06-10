import { BiMessageAdd } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import Avatar from "../../../assets/avatar.webp";

const conversations = [
  {
    name: "John Doe",
    image: "/",
    latestMessage: "See you later",
  },
  {
    name: "Alert Einstein",
    image: "/",
    latestMessage: "We don't have much time",
  },
  {
    name: "Charles Darwin",
    image: "/",
    latestMessage: "You're just a monkey",
  },
  {
    name: "Isaac Newton",
    image: "/",
    latestMessage: "What apple ??",
  },
  {
    name: "Leonardo Davincci",
    image: "/",
    latestMessage: "I don't know if she smiled or not ",
  },
];

const Chat: React.FC = () => {
  return (
    <div className="hidden xl:flex w-[300px] h-[90vh] bg-white m-2 mt-0 rounded p-6 flex-col border border-gray-100">
      <div className="flex space-x-2 items-center justify-between ">
        <h1 className="text-2xl font-bold">Messaging</h1>
        <div className="flex gap-4">
          <BiMessageAdd size={22} fill="#8C8E92" className="cursor-pointer" />
          <HiDotsHorizontal
            size={22}
            fill="#8C8E92"
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-6">
        {/* Conversations List goes here */}
        {conversations.map((conversation) => {
          return (
            <div
              key={conversation.name}
              className=" flex p-2 gap-2 cursor-pointer  rounded hover:bg-primary_grey"
            >
              <div className="w-[50px] h-[50px] overflow-hidden">
                <img
                  alt={conversation.name}
                  width={50}
                  height={50}
                  src={Avatar}
                  className="rounded-2xl object-contain"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{conversation.name}</p>
                <p className="text-text_grey text-sm">
                  {conversation.latestMessage.slice(0, 20)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Chat;
