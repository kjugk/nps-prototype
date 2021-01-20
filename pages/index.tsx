import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>NPS ツール</h1>
      <h2>ページ一覧</h2>
      <ul>
        <li>
          <Link href="/projects">プロジェクト一覧</Link>
        </li>
        <li>
          <Link href="/companies">企業一覧</Link>
        </li>
      </ul>
    </div>
  );
}
