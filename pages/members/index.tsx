import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Member } from "../../models/project";
import { PageLayout } from "../../components/page-layout";
import { TableCell } from "../../components/table-cell";
import { Button } from "../../components/button";
import { TableHeader } from "../../components/table-header";
import { Box } from "../../components/box";
import { MemberRepository } from "../../repositories/member/member-repository";

interface Props {
  members: Member[];
}

// 社員一覧を表示する
const MembersPage: NextPage<Props> = ({ members }) => {
  return (
    <PageLayout>
      <div className="mb-8 flex items-center">
        <h1 className="mr-4">メンバー一覧</h1>
        <Button>csvインポート</Button>
      </div>

      <Box noPadding>
        <table className="table-fixed">
          <thead>
            <tr>
              <TableHeader>メンバーID</TableHeader>
              <TableHeader>氏名</TableHeader>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <Link href={`/members/${member.id}`} key={member.id}>
                <tr className="cursor-pointer hover:bg-gray-100">
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </Box>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const memberRepository = new MemberRepository();
  const members = await memberRepository.getMembers();

  return {
    props: {
      members,
    }, // will be passed to the page component as props
  };
};

export default MembersPage;
