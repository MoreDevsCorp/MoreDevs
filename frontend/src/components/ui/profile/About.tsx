interface AboutProps {
  content: string | undefined;
}

export default function About({ content }: AboutProps) {
  return (
    <div className=" p-6 space-y-4 border border-gray-100 rounded">
      <h1 className="font-semibold text-2xl text-black-900">Bio</h1>

      <div className="flex flex-wrap space-x-2 bg-white  py-6 ">
        <p className="font-xl tracking-normal text-black-900">{content}</p>
      </div>
    </div>
  );
}
