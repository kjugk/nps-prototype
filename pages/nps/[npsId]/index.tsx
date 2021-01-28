import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { useRef } from "react";
import { Box } from "../../../components/box";
import { Button } from "../../../components/button";
import { Divider } from "../../../components/divider";
import { PageLayout } from "../../../components/page-layout";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";
import { getNpsStatusLabel } from "../../../utils/nps-util";

interface Props {
  nps: Nps;
  npsAnswers: NpsAnswer[];
  npsMemberAnswers: { [memberId: string]: NpsMemberAnswer[] };
}

// NPS詳細を表示する
const NpsPage: NextPage<Props> = ({ nps, npsAnswers, npsMemberAnswers }) => {
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/nps/${nps.id}/edit`
    );
    window.alert("コピーしました！");
    copyButtonRef.current.blur();
  };

  return (
    <PageLayout>
      <div className="mb-4">
        <Button onClick={handleCopyUrl} ref={copyButtonRef}>
          回答ページのURLをコピー
        </Button>
      </div>

      <Box>
        <h2>回答情報</h2>
        <Divider />

        <div className="grid grid-cols-2">
          <div>ステータス : {getNpsStatusLabel(nps)}</div>
          <div>プロジェクト名 : {nps.projectName}</div>
          <div>回答者 : {nps.answererName || "-"}</div>
          <div>企業名 : {nps.companyName}</div>
          <div>回答日時 : {nps.answeredAt}</div>
        </div>
      </Box>

      <Box>
        <h2>回答内容</h2>
        <Divider />
        <ul>
          {npsAnswers.map((answer, i) => (
            <li key={i} className="mb-4">
              <div>{answer.question}</div>
              <p className="font-bold">{answer.answer}</p>
            </li>
          ))}
        </ul>
      </Box>

      {nps.members.map((member) => {
        const answers = npsMemberAnswers[member.id];
        if (!answers) return null;

        return (
          <Box key={member.id}>
            <h2>{member.name} への評価</h2>
            <Divider />
            <ul>
              {answers.map((a) => {
                return (
                  <li key={a.id} className="mb-4">
                    <div>{a.question}</div>
                    <p className="font-bold">{a.answer}</p>
                  </li>
                );
              })}
            </ul>
          </Box>
        );
      })}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // cookie からユーザー復元する
  let { npsId } = context.query;
  npsId = Array.isArray(npsId) ? npsId[0] : npsId;

  const repository = new NpsRepository();
  const [nps, npsAnswers, npsMemberAnswers] = await Promise.all([
    repository.getNpsById(npsId),
    repository.getNpsAnswers(npsId),
    repository.getNpsMemberAnswers(npsId),
  ]);

  return {
    props: {
      nps,
      npsAnswers,
      npsMemberAnswers,
    },
  };
};

export default NpsPage;
