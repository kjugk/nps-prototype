import { ChangeEvent, FC } from "react";

interface Props {
  name: string;
  inputRef: (ref: HTMLSelectElement) => void;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectBox: FC<Props> = ({
  name,
  inputRef,
  id,
  onChange,
  children,
}) => {
  return (
    <select
      className="border border-gray p-2"
      name={name}
      id={id}
      ref={inputRef}
      onChange={onChange}
    >
      {children}
    </select>
  );
};
