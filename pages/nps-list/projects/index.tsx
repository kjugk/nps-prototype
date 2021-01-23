import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ProjectRepository } from "../../../repositories/project/project-repository";
import { Project } from "../../../models/project";

interface Props {
  projects: Project[];
}

// NPS一覧を表示する
const NpsListByProjectsPage: NextPage<Props> = ({ projects }) => {
  return (
    <div>
      <h1>プロジェクト別NPS一覧</h1>
      <table>
        <tbody>
          <tr>
            <th>プロジェクトID</th>
            <th>プロジェクト名</th>
            <th>企業名</th>
            <th>統括</th>
          </tr>

          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Link href={`/nps-list/projects/${p.id}`}>{p.name}</Link>
              </td>
              <td>{p.companyName}</td>
              <td>{p.managerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default NpsListByProjectsPage;
