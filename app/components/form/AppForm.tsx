import { Formik } from "formik";
import { FormikHelpers } from "formik";
import * as Yup from "yup";

import { FormValuesType } from "../../screens/AddListingScreen";

const AppForm = ({
  children,
  validationSchema,
  onSubmit,
  initialValues,
}: {
  children: React.ReactNode;
  validationSchema: Yup.AnyObject;
  onSubmit: (
    values: FormValuesType,
    actions: FormikHelpers<FormValuesType>
  ) => void;
  initialValues: FormValuesType;
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => <>{children}</>}
      </Formik>
    </>
  );
};

export default AppForm;
