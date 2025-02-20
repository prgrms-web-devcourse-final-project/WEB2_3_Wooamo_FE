import { useState } from "react";

type Validator = (value: string | number) => string | null;

const useInputValidation = (
  initialValue: string | number,
  validate: Validator,
) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(null);
  };

  const validateOnSubmit = () => {
    const validationError = validate(value);
    setError(validationError);
    return validationError === null;
  };

  return {
    value: typeof initialValue === "number" ? Number(value) : value,
    error,
    onChange: handleChange,
    validate: validateOnSubmit,
  };
};

export default useInputValidation;
