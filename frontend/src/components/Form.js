import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./Input"; // Sử dụng lại component Input đã viết trước đó

function Form({ fields, onSubmit }) {
  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      if (field.required) {
        schema[field.name] = Yup.string().required("Trường này là bắt buộc");
      }
      return schema;
    }, {})
  );

  const formik = useFormik({
    initialValues: fields.reduce((values, field) => {
      values[field.name] = "";
      return values;
    }, {}),
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <Input
          key={field.name}
          param={{
            type: field.type || "text",
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            showHint: true,
          }}
          onValueChange={formik.handleChange}
          className="w-full"
        />
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-500 rounded"
      >
        Gửi
      </button>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
