import { ComponentPropsWithoutRef } from "react";
import Input from "./Input";

interface InputWithErrorMsgProps extends ComponentPropsWithoutRef<"input"> {
  error: string | null;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithErrorMsg({
  error,
  value,
  onChange,
  ...props
}: InputWithErrorMsgProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input value={String(value)} onChange={onChange} {...props} />
      {error && (
        <span key={error} className="text-site-alarm">
          {error}
        </span>
      )}
    </div>
  );
}
