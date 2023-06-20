import { Formik, Form, Field } from "formik";
import Button from "../Button";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import skillOperations from "../../../graphql/operations/skill";
import offerOperations from "../../../graphql/operations/offer";
import {
  GetSkillsData,
  CreateOfferData,
  CreateOfferVariables,
} from "../../../types";

const CreateJobOffer = () => {
  const [skillsInput, setSkillsInput] = useState(null);

  const { data, loading, error } = useQuery<GetSkillsData>(
    skillOperations.Queries.getSkills
  );

  const [createOfferMutation, {}] = useMutation<
    CreateOfferData,
    CreateOfferVariables
  >(offerOperations.Mutations.createOffer);

  const [skills, setSkills] = useState<
    { id: string; name: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    if (data?.getSkills) {
      console.log(data);
      const newIntersts = data.getSkills.skills.map((skill) => ({
        ...skill,
        selected: false,
      }));
      setSkills(newIntersts);
    }
  }, [data?.getSkills]);

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
          console.log(values);
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
            <label>Skills</label>
            <CreatableSelect
              isMulti
              onChange={setSkillsInput}
              placeholder="enter the required skills"
              options={skills}
            />
            <div className="h-5" />
            <div className="flex flex-col">
              <span className="">Job Type</span>
              <Field
                name="jobType"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.jobType && touched.jobType && "border-red-500"
                }`}
              />
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
