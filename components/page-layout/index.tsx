import { FC } from "react";
import Link from "next/link";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full w-52 bg-blue">
          <div className="text-2xl p-4 pt-8 text-white ">NPS</div>
          <ul className="text-white">
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/projects">
                <div className="p-4">プロジェクト一覧</div>
              </Link>
            </li>
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/members">
                <div className="p-4">メンバー一覧</div>
              </Link>
            </li>
            <li className="hover:bg-blue-300 cursor-pointer">
              <Link href="/companies">
                <div className="p-4">企業一覧</div>
              </Link>
            </li>
            <li className="hover:bg-blue-300 cursor-pointer">
              <div className="p-4">質問テンプレート編集</div>
            </li>
          </ul>
        </div>
        <div className="h-full flex-1 p-8 bg-gray-100 overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};
