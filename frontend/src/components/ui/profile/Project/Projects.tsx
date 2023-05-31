import ProjectSlide from "./ProjectSlide";

export default function Projects() {
  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <h1 className="font-semibold text-2xl text-black-900">Projects</h1>
      <h6 className="cursor-pointer inline-block">Show All</h6>
      <div className="flex flex-wrap gap-4 bg-white py-6 ">
        <ProjectSlide />
        <ProjectSlide />
        <ProjectSlide />
      </div>
    </div>
  );
}



