import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { debounce } from "lodash";

function Input({ param, onValueChange = () => {}, customValidation = null, className = '' }) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    [param.name]: customValidation || Yup.lazy(() => {
      let schema;
      switch (param.type) {
        case 'email':
          schema = Yup.string().email(t('form-errors.invalid-email'));
          break;
        case 'number':
          schema = Yup.number();
          break;
        default:
          schema = Yup.string();
          break;
      }
      return param.required ? schema.required(t('form-errors.required')) : schema;
    }),
  });

  const formik = useFormik({
    initialValues: { [param.name]: param.initialValues || "" },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const hasError = formik.touched[param.name] && formik.errors[param.name];

  const debouncedChangeHandler = debounce((e) => {
    onValueChange(e.target.value);
  }, 300);

  const handleChange = (e) => {
    formik.handleChange(e);
    debouncedChangeHandler(e);
  };

  return (
    <div className={`${className}`}>
      <input
        className={`bg-transparent rounded-md border pl-4 py-3 w-full ${
          hasError ? "border-red" : "border-gray-300"
        }`}
        placeholder={param.placeholder || ''}
        id={param.name}
        name={param.name}
        type={param.type || 'text'}
        value={formik.values[param.name]}
        onChange={handleChange}
        onBlur={formik.handleBlur}
      />
      {hasError && param.showHint && (
        <small className="text-red mt-1 block text-xs leading-tight">
          {formik.errors[param.name]}
        </small>
      )}
    </div>
  );
}

Input.propTypes = {
  param: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
    name: PropTypes.string.isRequired,
    initialValues: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    showHint: PropTypes.bool,
  }).isRequired,
  onValueChange: PropTypes.func,
  customValidation: PropTypes.object,
  className: PropTypes.string,
};

export default Input;
