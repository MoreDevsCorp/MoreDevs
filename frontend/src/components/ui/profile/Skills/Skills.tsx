import Tag from "../../Tag";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import Button from "../../Button";
import Input from "../../inputs/Input";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Skills() {
  const navigate = useNavigate();
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
        <PencilIcon
          onClick={() => navigate("details/skills")}
          className="hover:opacity-50 cursor-pointer h-5 w-5"
        />
      </div>

      <div className="flex flex-wrap gap-2 bg-white  py-6 text-black-900">
        {skills.map((skill) => {
          return <Tag skill={skill} />;
        })}
      </div>
    </div>
  );
}
