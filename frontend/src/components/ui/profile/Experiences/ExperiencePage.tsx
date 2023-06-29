import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaUniversity } from "react-icons/fa";
import Button from "../../Button";
import Input from "../../inputs/Input";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ExperienceRow from "./ExperienceRow";
import ExperienceForm from "./ExperienceForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const ExperiencePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userLogin.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [experienceInputs, setExperienceInputs] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      title: "Ecole Fraincaise D'enseignement Technique",
      diploma: "Technicien Specialisee",
      startDate: "2020",
      endDate: null,
      present: true,
      body: "Additional English classes and UX profile courses.",
    },
    {
      id: 2,
      title: "Ecole Fraincaise D'enseignement Technique",
      diploma: "Technicien Specialisee",
      startDate: "2020",
      endDate: null,
      present: true,
      body: "Additional English classes and UX profile courses.",
    },
  ]);

  return (
    <>
      <div className="w-full p-6 space-y-4 border border-gray-100 rounded">
        <ArrowLeftIcon
          className="hover:opacity-50 cursor-pointer h-5 w-5"
          onClick={() => navigate(`/profile/${user.id}`)}
        />
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl text-black-900">Experience</h1>
          <PlusIcon
            onClick={() => setIsOpen(true)}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        </div>

        <div className="flex flex-col space-y-10 bg-white  py-6 ">
          <ExperienceRow />
          <hr />
          <ExperienceRow />
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 "
        >
          <div
            className="fixed inset-0 bg-black opacity-30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-8 ">
            <Dialog.Panel className="flex flex-col space-y-5 w-1/2 mx-auto max-w-lg rounded bg-white p-4 ">
              <Dialog.Title>Add Experience</Dialog.Title>
              <ExperienceForm setIsOpen={setIsOpen} />
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ExperiencePage;
