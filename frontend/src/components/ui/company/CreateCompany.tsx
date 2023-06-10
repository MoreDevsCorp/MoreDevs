import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../Button";

const CreateCompany = () => {
  return (
    <div className="w-full px-20 mx-auto my-6">
      <Formik
        initialValues={{
          company_name: "",
          company_slogan: "",
          company_profile_image: "",
          company_bio: "",
          company_location: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6 flex flex-col">
            <div className="flex flex-col ">
              <span>Company Name</span>
              <Field
                name="company_name"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.company_name &&
                  touched.company_name &&
                  "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Company Slogan</span>
              <Field
                name="company_slogan"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.company_slogan &&
                  touched.company_slogan &&
                  "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Company Bio</span>
              <Field
                name="company_bio"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.company_bio && touched.company_bio && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Company Location</span>
              <Field
                name="company_location"
                type="text"
                className={`border rounded  outline-none p-2 ${
                  errors.company_location &&
                  touched.company_location &&
                  "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <span>Company Profile Image</span>
              <Field
                name="company_profile_image"
                type="file"
                className={`border rounded  outline-none p-2 ${
                  errors.company_profile_image &&
                  touched.company_profile_image &&
                  "border-red-500"
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

export default CreateCompany;
