import { GetServerSideProps } from "next";
import Link from "next/link";
import { CompanyRepository } from "../../repositories/project/company-repository";
import { NextPage } from "next";
import { Company } from "../../models/company";
import { PageLayout } from "../../components/page-layout";
import { TableCell } from "../../components/table-cell";
import { TableHeader } from "../../components/table-header";
import { Button } from "../../components/button";

interface Props {
  companies: Company[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const CompaniesPage: NextPage<Props> = ({ companies }) => {
  return (
    <PageLayout>
      <h1 className="mb-2">企業一覧</h1>
      <Button>新規企業作成</Button>

      <div className="bg-white mt-4">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <TableHeader>企業ID</TableHeader>
              <TableHeader>企業名</TableHeader>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>
                  <Link href={`/companies/${c.id}`}>{c.name}</Link>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
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
