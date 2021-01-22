import { GetServerSideProps } from "next";
import Link from "next/link";
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
        <tbody>
          <tr>
            <th>NPS ID</th>
            <th>ステータス</th>
            <th>回答者名</th>
            <th>メンバー</th>
            <th>回答日時</th>
          </tr>

          {npsList.map((nps) => (
            <tr key={nps.id}>
              <td>
                <Link href={`/nps-list/${nps.id}`}>{nps.id}</Link>
              </td>
              <td>{nps.status === "done" ? "回答済" : "未回答"}</td>
              <td>{nps.answererName === "" ? "-" : nps.answererName}</td>
              <td>
                {nps.members.map((member, i) => (
                  <span key={i}>{member.name === "" ? "-" : member.name}</span>
                ))}
              </td>
              <td>{nps.answeredAt}</td>
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
  // cookie の JWT からユーザー復元して、users からカレントユーザー取得する

  let { projectId } = context.query;
  projectId = Array.isArray(projectId) ? projectId[0] : projectId;

  const [project, npsList] = await Promise.all([
    new ProjectRepository().getProject(projectId),
    new NpsRepository().getAllByProject(projectId),
  ]);

  return {
    props: {
      project,
      npsList,
    },
  };
};

export default NpsListByProject;
