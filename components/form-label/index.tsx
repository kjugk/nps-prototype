import { FC } from "react";

interface Props {
  htmlFor?: string;
  labelText: string;
}

export const FormLabel: FC<Props> = ({ htmlFor, labelText }) => {
  return (
    <label
      className="block text-gray-400 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {labelText}
    </label>
  );
};
