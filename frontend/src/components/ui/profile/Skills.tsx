import Tag from "../Tag";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import Button from "../Button";
import Input from "../inputs/Input";

export default function Skills() {
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
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Skills</h1>
        <HiOutlinePencilAlt
          onClick={() => setIsOpen(true)}
          size={24}
          className="hover:opacity-50 cursor-pointer"
        />
      </div>

      <div className="flex flex-wrap gap-2 bg-white  py-6 text-black-900">
        {skills.map((skill) => {
          return <Tag skill={skill} />;
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
          className="fixed inset-0 bg-black-900 opacity-30"
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
  );
}
