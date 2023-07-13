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
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteEducationData,
  DeleteEducationVariables,
  GetEducationsData,
} from "../../../../types";
import education from "../../../../graphql/operations/education";
import { toast } from "react-hot-toast";

interface EducationPageProps {
  refetchProfile: () => void;
}

const EducationPage = ({ refetchProfile }: EducationPageProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const {
    data: educationsData,
    error,
    refetch,
  } = useQuery<GetEducationsData>(education.Queries.getEducations);

  const [deleteEducation] = useMutation<
    DeleteEducationData,
    DeleteEducationVariables
  >(education.Mutations.deleteEducation);

  const user = useSelector(selectUser);

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
          {educationsData?.getEducations?.educations.length == 0
            ? "You have no educations yet"
            : educationsData?.getEducations.educations.map((db) => {
                console.log(db);
                console.log(new Date(db.startedAt).toDateString());

                const nsDate = new Date(db?.startedAt.replace(" ", "T"));
                const neDate = new Date(db?.endedAt?.replace(" ", "T"));

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
                            {db.level}
                          </h6>

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
                        <TrashIcon
                          onClick={() => {
                            deleteEducation({
                              variables: {
                                educationId: db.id,
                              },
                              onCompleted: (data) => {
                                console.log(data);

                                if (data.deleteEducation.success) {
                                  toast.success("Education has been deleted !");
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
                <EducationForm
                  setIsOpen={setIsOpen}
                  refetch={() => {
                    refetch();
                    refetchProfile();
                  }}
                />
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
