import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const MenuList: FC = () => {
  const router = useRouter();
  const getItemClassName = (path: string) => {
    const regex = new RegExp(`^${path}`);
    const base = "hover:bg-blue-300 cursor-pointer";

    if (regex.test(router.pathname)) {
      return `${base} bg-blue-300`;
    }

    return base;
  };

  return (
    <ul className="text-white">
      <li className={getItemClassName("/projects")}>
        <Link href="/projects">
          <div className="p-4">プロジェクト一覧</div>
        </Link>
      </li>
      <li className={getItemClassName("/members")}>
        <Link href="/members">
          <div className="p-4">メンバー一覧</div>
        </Link>
      </li>
      <li className={getItemClassName("/companies")}>
        <Link href="/companies">
          <div className="p-4">企業一覧</div>
        </Link>
      </li>
      <li className={getItemClassName("/templates")}>
        <div className="p-4">質問テンプレート編集</div>
      </li>
    </ul>
  );
};
