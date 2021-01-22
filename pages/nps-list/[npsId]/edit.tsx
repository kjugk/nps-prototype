import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
interface Props {
  nps: Nps;
  npsAnswers: NpsAnswer[];
  npsMemberAnswers: NpsMemberAnswer[];
}

const NpsEditPage: NextPage<Props> = ({
  nps,
  npsAnswers,
  npsMemberAnswers,
}) => {
  const handleSubmit = () => {
    // Put メソッドでパラメーター渡す
  };

  return (
    <div>
      <h2>NPS 回答ページ</h2>

      <h3>ご回答さまについて</h3>

      <h3>プロジェクトについて</h3>
      <ul>
        {npsAnswers.map((a, i) => (
          <li key={i}>
            <div>{a.question}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // cookie からユーザー復元する

  let { npsId } = context.query;
  npsId = Array.isArray(npsId) ? npsId[0] : npsId;

  const repository = new NpsRepository();
  const [nps, npsAnswers, npsMemberAnswers] = await Promise.all([
    repository.getNpsById(npsId),
    repository.getNpsAnswers(npsId),
    repository.getNpsMemberAnswers(npsId),
  ]);

  // 回答済だったら表示しない

  return {
    props: {
      nps,
      npsAnswers,
      npsMemberAnswers,
    },
  };
};

export default NpsEditPage;
