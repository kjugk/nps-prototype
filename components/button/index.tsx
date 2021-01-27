import { forwardRef, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      ref={ref}
      type={props.type}
      onClick={props.onClick}
      className="p-2 px-8 rounded-full bg-blue text-sm text-white focus:outline-none focus:bg-blue-300 active:bg-blue-300 align-center w-40 min-w-max"
    >
      {props.children}
    </button>
  );
});
