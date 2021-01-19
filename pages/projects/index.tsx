import { GetServerSideProps } from "next";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { NextPage } from "next";
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
            <div>{p.companyName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // cookie からユーザー復元する
  const projectRepository = new ProjectRepository();
  const projects = await projectRepository.getAll();

  return {
    props: {
      projects: projects,
    }, // will be passed to the page component as props
  };
};

export default ProjectsPage;
