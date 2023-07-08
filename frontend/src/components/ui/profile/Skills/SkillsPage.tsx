import { Dialog } from "@headlessui/react";
import { useState } from "react";

import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../state/userSlice/userSlice";
import Button from "../../Button";
import Input from "../../inputs/Input";

const SkillsPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const [skill, setSkill] = useState(" ");
  const [skills, setSkills] = useState([
    "HTML",
    "CSS",
    "JS",
    "Angular",
    "React",
  ]);

  return (
    <>
      <div className="w-full p-6 space-y-4 border border-gray-100 rounded">
        <ArrowLeftIcon
          className="hover:opacity-50 cursor-pointer h-5 w-5"
          onClick={() => navigate(`/profile/${user.id}`)}
        />
        <div className="flex justify-between items-center py-1">
          <h1 className="font-semibold text-2xl text-black-900">Skills</h1>
          <PlusIcon
            onClick={() => setIsOpen(true)}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        </div>

        <div className="flex flex-wrap space-y-4  gap-2 bg-white  py-6 text-black-900">
          {skills.map((skill) => {
            return (
              <div className="w-full" key={skill}>
                <div className="flex items-center justify-between pb-2">
                  <h3>{skill}</h3>
                  <TrashIcon
                    onClick={() => {}}
                    className="hover:opacity-50 cursor-pointer h-5 w-5"
                  />
                </div>

                <hr />
              </div>
            );
          })}
        </div>

        {/* the modal */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 "
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div
            className="fixed inset-0 bg-black opacity-30"
            aria-hidden="true"
          />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col space-y-5 w-1/2 mx-auto max-w-sm rounded bg-white p-4">
              <Dialog.Title>Edit your bio</Dialog.Title>

              <Input
                placeHolder="Enter your skill"
                onChange={(e) => setSkill(e.target.value)}
                value={skill}
              />
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setSkills([...skills, skill]);
                  setSkill(" ");
                }}
              >
                Submit
              </Button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default SkillsPage;
