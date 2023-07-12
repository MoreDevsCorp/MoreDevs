import { useMutation, useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Button from "../Button";

// import skillOperations from "../../../graphql/operations/skill";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import offerOperations from "../../../graphql/operations/offer";
import skillOperations from "../../../graphql/operations/skill";
import { selectUser } from "../../../state/userSlice/userSlice";
import {
  CreateOfferData,
  CreateOfferVariables,
  GetSkillsData,
} from "../../../types";

const CreateJobOffer = () => {
  const [skillsInput, setSkillsInput] = useState<string[]>([]);
  const user = useSelector(selectUser);

  const { data } = useQuery<GetSkillsData>(skillOperations.Queries.getSkills);

  // skillOperations.Queries.getSkills
  const [createOfferMutation, {}] = useMutation<
    CreateOfferData,
    CreateOfferVariables
  >(offerOperations.Mutations.createOffer);

  const [skills, setSkills] = useState<
    { label: string; value: string; id: string }[]
  >([]);

  useEffect(() => {
    if (data?.getSkills) {
      const newSkills = data.getSkills.skills.map((skill) => ({
        label: skill.name,
        value: skill.name,
        id: skill.id,
      }));
      setSkills(newSkills);
    }
  }, [data?.getSkills, skillsInput]);

  return (
    <div className="w-full px-2 py-4">
      <Formik
        initialValues={{
          jobTitle: "",
          jobLocation: "",
          skills: [],
          jobType: "",
          jobDescription: "",
        }}
        // validationSchema={}
        onSubmit={(values) => {
          console.log({ ...values, skills: skillsInput });
          createOfferMutation({
            variables: {
              companyId: user.company.id,
              title: values.jobTitle,
              description: values.jobDescription,
              location: values.jobLocation,
              skillsIds: skillsInput,
              type: values.jobType,
            },
            onCompleted: () => {
              toast.success("Job Offer Successfully Created !");
            },
            onError: (error) => {
              toast.error(error.message);
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="h-10" />
            <div className="flex flex-col">
              <span className="">Job Title</span>
              <Field
                name="jobTitle"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.jobTitle && touched.jobTitle && "border-red-500"
                }`}
              />
            </div>
            <div className="h-5" />

            <div className="flex flex-col">
              <span className="">Job Description</span>
              <Field
                name="jobDescription"
                type="text"
                as="textarea"
                className={`border rounded  outline-none p-2 ${
                  errors.jobDescription &&
                  touched.jobDescription &&
                  "border-red-500"
                }`}
              />
            </div>

            <div className="h-5" />

            <div className="h-5" />

            <div className="flex flex-col">
              <span className="">Job Location</span>
              <Field
                name="jobLocation"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.jobLocation && touched.jobLocation && "border-red-500"
                }`}
              />
            </div>
            <div className="h-5" />
            <label>Skills</label>
            <CreatableSelect
              isMulti
              onChange={(e: any) => {
                const skills = e.map((s: { id: any }) => s.id);
                setSkillsInput(skills);
              }}
              placeholder="enter the required skills"
              options={skills}
            />
            <div className="h-5" />
            <div className="flex flex-col">
              <span className="">Job Type</span>

              <div className="flex flex-col justify-start gap-1 text-sm m-2">
                <div className="flex gap-2">
                  <Field
                    name="jobType"
                    value="fullTime"
                    type="radio"
                    className={`border rounded  outline-none p-2 ${
                      errors.jobType && touched.jobType && "border-red-500"
                    }`}
                  />
                  <p>Full Time</p>
                </div>
                <div className="flex gap-2">
                  <Field
                    name="jobType"
                    value="partTime"
                    type="radio"
                    className={`border rounded  outline-none p-2 ${
                      errors.jobType && touched.jobType && "border-red-500"
                    }`}
                  />
                  <p>Part Time</p>
                </div>
                <div className="flex gap-2">
                  <Field
                    name="jobType"
                    value="internship"
                    type="radio"
                    className={`border rounded  outline-none p-2 ${
                      errors.jobType && touched.jobType && "border-red-500"
                    }`}
                  />
                  <p>Internship</p>
                </div>
              </div>
            </div>
            <div className="h-5" />
            <div>
              <Button type="submit">Add Job</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateJobOffer;
