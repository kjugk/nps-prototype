import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { Project } from "../../models/project";

interface Props {
  projects: Project[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const ProjectsPage: NextPage<Props> = ({ projects }) => {
  return (
    <div>
      <h1>プロジェクト一覧</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <div>{p.name}</div>
            <div>
              <Link href={`/companies/${p.companyId}`}>{p.companyName}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // cookie からユーザー復元する
  const projectRepository = new ProjectRepository();
  const projects = await projectRepository.getAll();

  return {
    props: {
      projects,
    }, // will be passed to the page component as props
  };
};

export default ProjectsPage;
