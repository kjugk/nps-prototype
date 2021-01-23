import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";
import { useForm, useFieldArray } from "react-hook-form";

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
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      answerName: "",
      answers: npsAnswers,
    },
  });
  const { fields } = useFieldArray<NpsAnswer>({
    control,
    name: "answers",
    keyName: "id",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>NPS 回答ページ</h2>

      <h3>ご回答者さまについて</h3>
      <input
        type="text"
        name="answererName"
        placeholder="氏名"
        ref={register}
      />

      <h3>プロジェクトについて</h3>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <h4>{field.question}</h4>
            <input
              type="text"
              name={`answers[${index}].answer`}
              ref={register()}
            />
            <input
              type="hidden"
              name={`answers[${index}].answerId`}
              ref={register()}
              value={field.id}
            />
          </li>
        ))}

        {/* {npsAnswers.map((a, i) => (
          <li key={i}>
            <div>{a.question}</div>
            <input type="text" />
          </li>
        ))} */}
      </ul>

      <button type="submit">送信</button>
    </form>
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
