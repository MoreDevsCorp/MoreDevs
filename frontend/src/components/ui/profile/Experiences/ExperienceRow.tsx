import { MdOutlineWorkOutline } from "react-icons/md";

export default function ExperienceRow() {
  return (
    <div className="flex space-x-6 w-full">
      <div>
        <MdOutlineWorkOutline size={40} className="text-black-900" />
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold text-black-900">UX/UI designer</h2>

        <h6 className="text-md font-medium text-black-900">Upwork</h6>

        <h6 className="text-md font-light text-black-900">2020 - Present</h6>

        <h6 className="text-md text-black-900">
          New experience with Upwork system. Work in next areas: UX/UI design,
          graphic design, interaction design, UX research.{" "}
        </h6>
      </div>
    </div>
  );
}
