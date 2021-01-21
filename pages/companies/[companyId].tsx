import { GetServerSideProps } from "next";
import Link from "next/link";
import { CompanyRepository } from "../../repositories/project/company-repository";
import { NextPage } from "next";
import { Company } from "../../models/company";
import { Project } from "../../models/project";
import { ProjectRepository } from "../../repositories/project/project-repository";

interface Props {
  company: Company;
  companyProjects: Project[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const CompanyPage: NextPage<Props> = ({ company, companyProjects }) => {
  return (
    <div>
      <h1>{company.name}</h1>
      <h2>プロジェクト情報</h2>
      <ul>
        {companyProjects.map((p) => (
          <li key={p.id}>
            <div>
              <Link href={`/projects/${p.id}`}>{p.name}</Link>
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

  let { companyId } = context.query;
  companyId = Array.isArray(companyId) ? companyId[0] : companyId;
  const companyRepository = new CompanyRepository();

  const company = await companyRepository.getCompany(companyId);
  const companyProjects = await new ProjectRepository().getByCompanyId(
    companyId
  );

  return {
    props: {
      company,
      companyProjects,
    }, // will be passed to the page component as props
  };
};

export default CompanyPage;
