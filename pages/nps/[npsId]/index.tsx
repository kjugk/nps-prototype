import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { Box } from "../../../components/box";
import { Button } from "../../../components/button";
import { Divider } from "../../../components/divider";
import { PageLayout } from "../../../components/page-layout";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";

interface Props {
  nps: Nps;
  npsAnswers: NpsAnswer[];
  npsMemberAnswers: NpsMemberAnswer[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const NpsPage: NextPage<Props> = ({ nps, npsAnswers, npsMemberAnswers }) => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`http://localhost:3000/nps/${nps.id}/edit`);
  };

  return (
    <PageLayout>
      <div className="mb-4">
        <Button onClick={handleCopyUrl}>回答ページのURLをコピー</Button>
      </div>

      <Box>
        <h2>回答情報</h2>
        <Divider />

        <ul>
          <li>ステータス : {nps.status === "yet" ? "未回答" : "回答済"}</li>
          <li>プロジェクト名 : {nps.projectName}</li>
          <li>回答者 : {nps.answererName || "-"}</li>
          <li>企業名 : {nps.companyName}</li>
          <li>回答日時 : {nps.answeredAt}</li>
        </ul>
      </Box>

      <Box>
        <h2>回答内容</h2>
        <Divider />
        <ul>
          {npsAnswers.map((answer, i) => (
            <li key={i}>
              <div>{answer.question}</div>
              <div>{answer.answer}</div>
            </li>
          ))}
        </ul>
      </Box>

      <Box>
        <h2>メンバー別回答内容</h2>
        <Divider />
        <ul>
          {npsMemberAnswers.map((memberAnswer, i) => (
            <li key={i}>
              <div>{memberAnswer.memberName}</div>
              <ul>
                {memberAnswer.answers.map((answer, j) => (
                  <li key={j}>
                    <div>{answer.question}</div>
                    <div>{answer.answer}</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Box>
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
    }, // will be passed to the page component as props
  };
};

export default NpsPage;
