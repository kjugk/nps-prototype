import { FC } from "react";
import { MenuList } from "../shared/menu-list";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full w-52 bg-blue">
          <div className="text-2xl p-4 pt-8 text-white ">NPS</div>
          <MenuList />
        </div>
        <div className="h-full flex-1 p-8 bg-gray-100 overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};
