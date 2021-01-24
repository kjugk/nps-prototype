import { FC } from "react";

interface Props {
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button: FC<Props> = ({ onClick, type = "button", children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 px-8 rounded-full bg-blue text-sm text-white focus:outline-none focus:bg-blue-300 active:bg-blue-300 align-center w-40 min-w-max"
    >
      {children}
    </button>
  );
};
