import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { Member, Nps } from "../../models/project";
import { MemberRepository } from "../../repositories/member/member-repository";
import { PageLayout } from "../../components/page-layout";
import { NpsRepository } from "../../repositories/nps/nps-repository";
import { Box } from "../../components/box";
import React from "react";
import { NpsList } from "../../components/shared/nps-list";
import { Breadcrumbs } from "../../components/breadcrumbs";

interface Props {
  member: Member;
  npsList: Nps[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const MemberPage: NextPage<Props> = ({ member, npsList }) => {
  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            url: "/members",
            text: "メンバー一覧",
          },
          {
            text: member.name,
          },
        ]}
      />

      <article>
        <h1 className="mb-8">{member.name}</h1>

        <section>
          <h2 className="mb-4">詳細情報</h2>
          <Box>
            <div>部署: XXX</div>
            <div>マネージャー: YYY</div>
          </Box>
        </section>

        <section>
          <h2 className="mb-4">NPS一覧</h2>
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
  // cookie からユーザー復元する

  let { memberId } = context.query;

  // TODO util 化
  memberId = Array.isArray(memberId) ? memberId[0] : memberId;
  const memberRepository = new MemberRepository();
  const member = await memberRepository.getMember(memberId);

  const npsRepository = new NpsRepository();
  const npsList = await npsRepository.getAllNpsByMember(memberId);

  return {
    props: {
      member,
      npsList,
    },
  };
};

export default MemberPage;
