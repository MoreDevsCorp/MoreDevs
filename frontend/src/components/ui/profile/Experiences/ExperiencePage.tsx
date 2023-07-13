import { Dialog } from "@headlessui/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../state/userSlice/userSlice";
import ExperienceForm from "./ExperienceForm";
import ExperienceRow from "./ExperienceRow";
import {
  DeleteExperienceData,
  DeleteExperienceVariables,
  Experience,
  GetExperiencesData,
} from "../../../../types";
import { useMutation, useQuery } from "@apollo/client";
import experienceOperations from "../../../../graphql/operations/experience";

import { MdOutlineWorkOutline } from "react-icons/md";
import ExperienceEditForm from "./ExperienceEditForm";
import { toast } from "react-hot-toast";

interface ExperiencePageProps {
  refetchProfile: () => void;
}

const ExperiencePage = ({ refetchProfile }: ExperiencePageProps) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // const [experienceInputs, setExperienceInputs] = useState("");


  const {
    data: experiencesData,
    error,
    refetch,
  } = useQuery<GetExperiencesData>(experienceOperations.Queries.getExperiences);

  const [deleteExperience] = useMutation<
    DeleteExperienceData,
    DeleteExperienceVariables
  >(experienceOperations.Mutations.deleteExperience);


  console.log(experiencesData, error);

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

        {experiencesData?.getExperiences?.experiences.length == 0
          ? "You have no experiences yet"
          : experiencesData?.getExperiences?.experiences.map((db) => {
              const nsDate = new Date(db?.startDate.replace(" ", "T"));
              const neDate = new Date(db?.endDate?.replace(" ", "T"));

              return (
                <div key={db.id}>
                  <div className="flex items-start justify-between w-full pb-2">
                    <div className="flex space-x-6 w-full">
                      <div>
                        <MdOutlineWorkOutline
                          size={40}
                          className="text-black-900"
                        />
                      </div>

                      <div className="flex flex-col space-y-3">
                        <h2 className="text-xl font-semibold text-black-900">
                          {db.title}
                        </h2>

                        <h6 className="text-md font-light text-black-900">
                          {nsDate.getFullYear() + "-" + nsDate.getMonth()} |{" "}
                          {db.present
                            ? "Present"
                            : neDate.getFullYear() + "-" + neDate.getMonth()}
                        </h6>

                        <h6 className="text-md text-black-900">
                          {db.description}
                        </h6>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {/* <PencilIcon
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                        className="hover:opacity-50 cursor-pointer h-5 w-5"
                      /> */}
                      <TrashIcon
                        onClick={() => {
                          deleteExperience({
                            variables: {
                              experienceId: db.id,
                            },
                            onCompleted: (data) => {
                              console.log(data);

                              if (data.deleteExperience.success) {
                                toast.success("Experience has been deleted !");
                                refetchProfile();
                                refetch();
                              }
                            },
                          });
                        }}
                        className="hover:opacity-50 cursor-pointer h-5 w-5"
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
        {/* 
        <div className="flex flex-col space-y-10 bg-white  py-6 ">
          <ExperienceRow experience={data[0]} />
          <hr />
          <ExperienceRow experience={data[1]} />
        </div> */}

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
                {isOpen ? "Add Experience" : "Update Experience"}
              </Dialog.Title>
              {isOpen ? (
                <ExperienceForm
                  setIsOpen={setIsOpen}
                  refetch={() => {
                    refetch();
                    refetchProfile();
                  }}
                />
              ) : (
                <ExperienceEditForm isOpenEdit={setIsOpenEdit} />
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ExperiencePage;
