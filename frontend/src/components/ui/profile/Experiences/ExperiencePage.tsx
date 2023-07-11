import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../state/userSlice/userSlice";
import ExperienceForm from "./ExperienceForm";
import ExperienceRow from "./ExperienceRow";
import { Experience, GetExperiencesData } from "../../../../types";
import { useQuery } from "@apollo/client";
import experienceOperations from "../../../../graphql/operations/experience";

const ExperiencePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [experienceInputs, setExperienceInputs] = useState("");
  const [data, setData] = useState<Experience[]>([
    {
      id: "1",
      title: "Ecole Fraincaise D'enseignement Technique",
      startDate: "2020",
      endDate: "",
      present: true,
      description: "Additional English classes and UX profile courses.",
      location: "Agadir",
      company: {
        id: "ss",
        name: "FikraLabs",
        location: "Agadir",
        avatar: "null",
      },
    },
    {
      id: "2",
      title: "Ecole Fraincaise D'enseignement Technique",
      startDate: "2020",
      endDate: "",
      present: true,
      description: "Additional English classes and UX profile courses.",
      location: "Agadir",
      company: {
        id: "ss",
        name: "FikraLabs",
        location: "Agadir",
        avatar: "null",
      },
    },
  ]);

  const { data: experiencesData } = useQuery<GetExperiencesData>(
    experienceOperations.Queries.getExperiences
  );

  console.log(experiencesData);

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

        {experiencesData?.getExperiences?.experiences.map((experience) => {
          return <ExperienceRow experience={experience} />;
        })}
        {/* 
        <div className="flex flex-col space-y-10 bg-white  py-6 ">
          <ExperienceRow experience={data[0]} />
          <hr />
          <ExperienceRow experience={data[1]} />
        </div> */}

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
