import { Field, Form, Formik } from "formik";
import Button from "../../Button";

interface EducationFormProps {
  setIsOpen: (value: boolean) => void;
}

const ExperienceForm = ({ setIsOpen }: EducationFormProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          present: "",
          body: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          setIsOpen(false);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="space-y-6 flex flex-col">
            <div className="flex flex-col ">
              <span>Job Title</span>
              <Field
                name="jobTitle"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.jobTitle && touched.jobTitle && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Company</span>
              <Field
                name="company"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.company && touched.company && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Start Date</span>
              <Field
                name="startDate"
                type="date"
                className={`border rounded  outline-none p-2 ${
                  errors.startDate && touched.startDate && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <span>Present</span>
              <Field
                name="present"
                type="checkbox"
                className={`border rounded  outline-none p-2 ${
                  errors.present && touched.present && "border-red-500"
                }`}
              />
            </div>

            {!values.present && (
              <div className="flex flex-col ">
                <span>End Date</span>
                <Field
                  name="endDate"
                  type="date"
                  className={`border rounded  outline-none p-2 ${
                    errors.endDate && touched.endDate && "border-red-500"
                  }`}
                />
              </div>
            )}

            <div className="flex flex-col ">
              <span>Body</span>
              <Field
                name="body"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.body && touched.body && "border-red-500"
                }`}
              />
            </div>

            <Button type="submit">Create</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ExperienceForm;
