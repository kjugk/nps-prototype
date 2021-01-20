import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { ProjectRepository } from "../../../repositories/project/project-repository";
import { Nps, Project } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";

interface Props {
  project: Project;
  npsList: Nps[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const NpsListByProject: NextPage<Props> = ({ project, npsList }) => {
  return (
    <div>
      <h1>{project.name} のNPS一覧</h1>
      <table>
        <tr>
          <th>回答者名</th>
          <th>メンバー</th>
          <th>回答日時</th>
        </tr>
        {npsList.map((nps) => (
          <tr>
            <td>{nps.answererName}</td>
            <td>
              {nps.members.map((member) => {
                return <span>{member.name}</span>;
              })}
            </td>
            <td>{nps.answeredAt}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // cookie からユーザー復元する

  let { projectId } = context.query;
  projectId = Array.isArray(projectId) ? projectId[0] : projectId;
  const project = await new ProjectRepository().getProject(projectId);
  const npsList = await new NpsRepository().getAllByProject(projectId);

  return {
    props: {
      project,
      npsList,
    }, // will be passed to the page component as props
  };
};

export default NpsListByProject;
