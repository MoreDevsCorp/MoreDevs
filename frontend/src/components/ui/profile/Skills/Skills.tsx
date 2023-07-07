import Tag from "../../Tag";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import Button from "../../Button";
import Input from "../../inputs/Input";
import { useNavigate, useParams } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Skill } from "../../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { selectUser } from "../../../../state/userSlice/userSlice";

interface SkillsProps {
  skills: Skill[] | undefined;
}

export default function Skills({ skills }: SkillsProps) {
  const { userId } = useParams();
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  // const [skills, setSkills] = useState([
  //   "HTML",
  //   "CSS",
  //   "JS",
  //   "Angular",
  //   "React",
  // ]);

  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Skills</h1>
        {userId === user.id && (
          <PencilIcon
            onClick={() => navigate("details/skills")}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2 bg-white  py-6 text-black-900">
        {skills?.length == 0 ? (
          user.id == userId ? (
            <h3 className="italic text-gray-500">
              Add your skills to improve your profile.
            </h3>
          ) : (
            <h3 className="italic text-gray-500">
              This User has not added his skills yet.
            </h3>
          )
        ) : (
          skills?.map((skill) => {
            return <Tag skill={skill.name} key={skill.id} />;
          })
        )}
      </div>
    </div>
  );
}
