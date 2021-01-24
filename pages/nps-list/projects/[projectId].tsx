import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPage } from "next";
import { ProjectRepository } from "../../../repositories/project/project-repository";
import { Nps, Project } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";
import axios from "axios";

interface Props {
  project: Project;
  npsList: Nps[];
}

const NpsListByProject: NextPage<Props> = ({ project, npsList }) => {
  const router = useRouter();
  const handleCreateNps = async () => {
    // TODO クライアント用のユースケース作る?
    await axios.post("/api/create-nps", {
      projectId: project.id,
    });

    window.alert("NPS を作成しました。");
    router.reload();
  };

  return (
    <div>
      <h1>{project.name} プロジェクトのNPS一覧</h1>
      <button type="button" onClick={handleCreateNps}>
        新規作成
      </button>
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
              <td>{nps.answeredAt ?? "-"}</td>
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
    new NpsRepository().getAllNpsByProject(projectId),
  ]);

  return {
    props: {
      project,
      npsList,
    },
  };
};

export default NpsListByProject;
