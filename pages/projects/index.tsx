import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { Project } from "../../models/project";
import { PageLayout } from "../../components/page-layout";
import { TableCell } from "../../components/table-cell";
import { Button } from "../../components/button";
import { TableHeader } from "../../components/table-header";

interface Props {
  projects: Project[];
}

// プロジェクト一覧を表示する
const ProjectsPage: NextPage<Props> = ({ projects }) => {
  const router = useRouter();

  return (
    <PageLayout>
      <div>
        <h1 className="mb-2">プロジェクト一覧</h1>
        <div>
          <Button onClick={() => router.push("/projects/new")}>
            新規プロジェクト作成
          </Button>
        </div>
      </div>

      <div className="bg-white mt-4">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <TableHeader>プロジェクトID</TableHeader>
              <TableHeader>プロジェクト名</TableHeader>
              <TableHeader>企業名</TableHeader>
              <TableHeader>統括</TableHeader>
              <TableHeader>メンバー</TableHeader>
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
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
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
