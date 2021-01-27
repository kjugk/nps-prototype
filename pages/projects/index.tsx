import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { Project } from "../../models/project";
import { PageLayout } from "../../components/page-layout";
import { TableCell } from "../../components/table-cell";
import { Button } from "../../components/button";
import { TableHeader } from "../../components/table-header";
import { Box } from "../../components/box";

interface Props {
  projects: Project[];
}

// プロジェクト一覧を表示する
const ProjectsPage: NextPage<Props> = ({ projects }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NPS - project index page</title>
      </Head>
      <PageLayout>
        <div className="mb-8 flex items-center">
          <h1 className="mr-4">プロジェクト一覧</h1>
          <Button onClick={() => router.push("/projects/new")}>
            新規プロジェクト作成
          </Button>
        </div>

        <Box noPadding>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <TableHeader>プロジェクトID</TableHeader>
                <TableHeader>プロジェクト名</TableHeader>
                <TableHeader>企業名</TableHeader>
                <TableHeader>統括</TableHeader>
                <TableHeader>メンバー</TableHeader>
                <TableHeader>開始日</TableHeader>
                <TableHeader>終了日</TableHeader>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <Link href={`/projects/${p.id}`} key={p.id}>
                  <tr className="cursor-pointer hover:bg-gray-100">
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.companyName}</TableCell>
                    <TableCell>{p.managerName}</TableCell>
                    <TableCell>
                      <span className="mr-4">
                        {p.members.map((m) => m.name).join(" , ")}
                      </span>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </Box>
      </PageLayout>
    </>
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
    },
  };
};

export default ProjectsPage;
