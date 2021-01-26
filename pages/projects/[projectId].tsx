import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { Nps, Project } from "../../models/project";
import { NpsRepository } from "../../repositories/nps/nps-repository";
import { PageLayout } from "../../components/page-layout";
import React from "react";
import { Button } from "../../components/button";
import { Box } from "../../components/box";
import { NpsList } from "../../components/shared/nps-list";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { axiosInstance } from "../../lib/axios";

interface Props {
  project: Project;
  npsList: Nps[];
}

const ProjectPage: NextPage<Props> = ({ project, npsList }) => {
  const router = useRouter();
  const handleCreateNps = async () => {
    await axiosInstance.post("/api/create-nps", {
      projectId: project.id,
    });

    window.alert("NPS を作成しました。");
    router.reload();
  };

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            url: "/projects",
            text: "プロジェクト一覧",
          },
          {
            text: project.name,
          },
        ]}
      />

      <article>
        <h1 className="mb-8">{project.name}</h1>

        <section>
          <div className="mb-4 flex items-center">
            <h2 className="mr-4">詳細情報</h2>
            <Button type="button">プロジェクト編集</Button>
          </div>

          <Box>
            <div>ID: {project.id}</div>
            <div>企業: {project.companyName}</div>
            <div>統括: {project.managerName}</div>
            <div>
              メンバー: {project.members.map((m) => m.name).join(" , ")}
            </div>
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
            <NpsList npsList={npsList} />
          </Box>
        </section>
      </article>
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
