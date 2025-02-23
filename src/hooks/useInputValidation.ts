import { useState } from "react";

type Validator<T> = (value: T) => string | null;

const useInputValidation = <T>(initialValue: T, validate: Validator<T>) => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as T;
    if (typeof initialValue === "number") {
      setValue(Number(newValue) as T);
    } else {
      setValue(newValue);
    }

    setError(null);
  };

  const validateOnSubmit = () => {
    const validationError = validate(value);
    setError(validationError);
    return validationError === null;
  };

  return {
    value,
    error,
    onChange: handleChange,
    validate: validateOnSubmit,
  };
};

export default useInputValidation;
