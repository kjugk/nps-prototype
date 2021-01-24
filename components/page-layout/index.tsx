import { FC } from "react";
import Link from "next/link";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1">
        <div className="h-full w-200 bg-blue">
          <div className="text-2xl p-4 pt-8">Goodpatch NPS</div>
          <ul className="text-white">
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/projects">
                <div className="p-4">プロジェクト一覧</div>
              </Link>
            </li>
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/companies">
                <div className="p-4">社員一覧</div>
              </Link>
            </li>
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/companies">
                <div className="p-4">企業一覧</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="h-full flex-1 p-8 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};
