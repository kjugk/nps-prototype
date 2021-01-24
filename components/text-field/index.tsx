import { FC } from "react";

interface Props {
  name: string;
  inputRef: (ref: HTMLInputElement) => void;
  id: string;
}

export const TextField: FC<Props> = ({ name, inputRef, id }) => {
  return (
    <input
      id={id}
      type="text"
      ref={inputRef}
      className="p-2 border border-gray"
      name={name}
    />
  );
};
