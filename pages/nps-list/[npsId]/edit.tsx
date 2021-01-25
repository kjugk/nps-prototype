import { GetServerSideProps } from "next";
import { NextPage } from "next";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../../models/project";
import { NpsRepository } from "../../../repositories/nps/nps-repository";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Box } from "../../../components/box";
import { Divider } from "../../../components/divider";
import { FormField } from "../../../components/form-field";
import { FormLabel } from "../../../components/form-label";
import { TextField } from "../../../components/text-field";
import { Button } from "../../../components/button";

interface Props {
  nps: Nps;
  npsAnswers: NpsAnswer[];
  npsMemberAnswers: NpsMemberAnswer[];
}

// NPS 回答ページ
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

  const onSubmit = async (data) => {
    await axios.put(`/api/update-nps/${nps.id}`, data);
    window.alert("回答を送信しました！");
  };

  return (
    <div>
      <header className="bg-blue p-4 text-white">NPS</header>
      <div className="w-2/4 mx-auto">
        <Box>
          <p>
            今後のプロジェクト品質向上のため、アンケートにご協力をお願いいたします
          </p>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <h3>ご回答者さまについて</h3>
            <Divider />

            <FormField>
              <FormLabel labelText="氏名" htmlFor="answererName" />
              <TextField
                id="answererName"
                name="answererName"
                inputRef={register()}
              />
            </FormField>
          </Box>

          <Box>
            <h3>プロジェクトについて</h3>
            <Divider />

            <ul>
              {fields.map((field, index) => (
                <li key={field.id}>
                  <FormField>
                    <FormLabel
                      labelText={field.question}
                      htmlFor={`answers[${index}].answer`}
                    />
                    <TextField
                      id={`answers[${index}].answer`}
                      name={`answers[${index}].answer`}
                      inputRef={register()}
                    />
                    <input
                      type="hidden"
                      name={`answers[${index}].answerId`}
                      ref={register()}
                      value={field.id}
                    />
                  </FormField>
                </li>
              ))}

              {/* {npsAnswers.map((a, i) => (
          <li key={i}>
            <div>{a.question}</div>
            <input type="text" />
          </li>
        ))} */}
            </ul>
          </Box>

          <div className="align-center pb-8">
            <Button type="submit">送信</Button>
          </div>
        </form>
      </div>
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
