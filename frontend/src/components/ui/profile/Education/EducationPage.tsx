import { Dialog } from "@headlessui/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../state/userSlice/userSlice";
import EducationForm from "./EducationForm";

import EducationEditForm from "./EducationEditForm";

const EducationPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const user = useSelector(selectUser);

  const [educationInputs, setEducationInputs] = useState("");
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
          <h1 className="font-semibold text-2xl text-black-900">Education</h1>
          <PlusIcon
            onClick={() => setIsOpen(true)}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        </div>

        <div className="flex flex-col space-y-10 bg-white  py-6 ">
          {data.map((db) => {
            return (
              <div key={db.id}>
                <div className="flex items-start justify-between w-full pb-2">
                  <div className="flex space-x-6 w-full">
                    <div>
                      <FaUniversity size={40} className="text-black-900" />
                    </div>

                    <div className="flex flex-col space-y-3">
                      <h2 className="text-xl font-semibold text-black-900">
                        {db.title}
                      </h2>

                      <h6 className="text-md font-medium text-black-900">
                        {db.diploma}
                      </h6>

                      <h6 className="text-md font-light text-black-900">
                        {db.startDate} - {db.endDate && db.endDate}{" "}
                        {db.present && "Present"}
                      </h6>

                      <h6 className="text-md text-black-900">{db.body}</h6>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <PencilIcon
                      onClick={() => {
                        setIsOpenEdit(true);
                        console.log("hola");
                      }}
                      className="hover:opacity-50 cursor-pointer h-5 w-5"
                    />
                    <TrashIcon
                      onClick={() => {}}
                      className="hover:opacity-50 cursor-pointer h-5 w-5"
                    />
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>

        <Dialog
          open={isOpen || isOpenEdit}
          onClose={() => {
            setIsOpen(false);
            setIsOpenEdit(false);
          }}
          className="relative z-50 "
        >
          <div
            className="fixed inset-0 bg-black opacity-30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-8 ">
            <Dialog.Panel className="flex flex-col space-y-5 w-1/2 mx-auto max-w-lg rounded bg-white p-4 ">
              <Dialog.Title>
                {isOpen ? "Add Education" : "Update Education"}
              </Dialog.Title>
              {isOpen ? (
                <EducationForm setIsOpen={setIsOpen} />
              ) : (
                <EducationEditForm isOpenEdit={setIsOpenEdit} />
              )}

              {/* <Button
                onClick={() => {
                  setIsOpen(false);
                  setSkills([...skills, skill]);
                  setSkill(" ");
                }}
              >
                Create
              </Button> */}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default EducationPage;
