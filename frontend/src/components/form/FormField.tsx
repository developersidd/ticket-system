import { Children } from "react";
import { FieldError } from "react-hook-form";
type FormFieldProps = {
  children: React.ReactNode;
  label?: string;
  error?: FieldError;
  htmlFor?: string;
};

const FormField = ({ children, label, error, htmlFor }: FormFieldProps) => {
  const id = htmlFor || getChildId(children);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-gray-600 mb-2 block font-bold">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="mt-1 text-sm text-red-500">
          {error?.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = Children.only(children);
  if ("id" in child.props) {
    return child.props.id;
  }
};

export default FormField;
