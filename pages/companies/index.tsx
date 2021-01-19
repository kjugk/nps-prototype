import { GetServerSideProps } from "next";
import Link from "next/link";
import { CompanyRepository } from "../../repositories/project/company-repository";
import { NextPage } from "next";
import { Company } from "../../models/company";

interface Props {
  companies: Company[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const CompaniesPage: NextPage<Props> = ({ companies }) => {
  return (
    <div>
      <h1>企業一覧</h1>
      <ul>
        {companies.map((c) => (
          <li key={c.id}>
            <Link href={`/companies/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // cookie からユーザー復元する

  const companyRepository = new CompanyRepository();
  const companies = await companyRepository.getAll();

  return {
    props: {
      companies,
    }, // will be passed to the page component as props
  };
};

export default CompaniesPage;