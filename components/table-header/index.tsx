import { FC } from "react";

export const TableHeader: FC = ({ children }) => {
  return <th className="text-left border-b border-gray-100 p-4">{children}</th>;
};
