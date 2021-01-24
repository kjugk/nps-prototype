import { FC } from "react";

export const TableCell: FC = ({ children }) => {
  return <td className="border-b border-gray-100 p-4">{children}</td>;
};
