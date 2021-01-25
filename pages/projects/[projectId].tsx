import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPage } from "next";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { Nps, Project } from "../../models/project";
import { NpsRepository } from "../../repositories/nps/nps-repository";
import axios from "axios";
import { PageLayout } from "../../components/page-layout";
import React from "react";
import { Button } from "../../components/button";
import { TableHeader } from "../../components/table-header";
import { TableCell } from "../../components/table-cell";
import { Box } from "../../components/box";

interface Props {
  project: Project;
  npsList: Nps[];
}

const ProjectPage: NextPage<Props> = ({ project, npsList }) => {
  const router = useRouter();
  const handleCreateNps = async () => {
    await axios.post("/api/create-nps", {
      projectId: project.id,
    });

    window.alert("NPS を作成しました。");
    router.reload();
  };

  return (
    <PageLayout>
      <h1 className="mb-4">{project.name} プロジェクト</h1>

      <section>
        <div className="mb-4 flex items-center">
          <h2 className="mr-4">詳細情報</h2>
          <Button type="button">プロジェクト編集</Button>
        </div>

        <Box>
          <div>ID: {project.id}</div>
          <div>企業: {project.companyName}</div>
          <div>統括: {project.managerName}</div>
          <div>メンバー: {project.members.map((m) => m.name).join(" , ")}</div>
        </Box>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center">
          <h2 className="mr-4">NPS 一覧</h2>
          <Button type="button" onClick={handleCreateNps}>
            新規 NPS 作成
          </Button>
        </div>

        <Box noPadding>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <TableHeader>NPS ID</TableHeader>
                <TableHeader>ステータス</TableHeader>
                <TableHeader>回答者名</TableHeader>
                <TableHeader>メンバー</TableHeader>
                <TableHeader>回答日時</TableHeader>
              </tr>
            </thead>

            <tbody>
              {npsList.map((nps) => (
                <Link href={`/nps-list/${nps.id}`} key={nps.id}>
                  <tr className="cursor-pointer hover:bg-gray-100">
                    <TableCell>
                      <Link href={`/nps-list/${nps.id}`}>{nps.id}</Link>
                    </TableCell>
                    <TableCell>
                      {nps.status === "done" ? "回答済" : "未回答"}
                    </TableCell>
                    <TableCell>
                      {nps.answererName === "" ? "-" : nps.answererName}
                    </TableCell>
                    <TableCell>
                      {nps.members.map((member) => member.name).join(" , ")}
                    </TableCell>
                    <TableCell>{nps.answeredAt ?? "-"}</TableCell>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </Box>
      </section>
    </PageLayout>
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

export default ProjectPage;
