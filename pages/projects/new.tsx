import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Company } from "../../models/company";
import { Member } from "../../models/project";
import { MemberRepository } from "../../repositories/member/member-repository";
import { CompanyRepository } from "../../repositories/project/company-repository";
import axios from "axios";

interface Props {
  companies: Company[];
  members: Member[];
}

// プロジェクト一覧を表示する
// TODO ログインしてなかったら sign-in ページにリダイレクト
const NewProjectsPage: NextPage<Props> = ({ companies, members }) => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      memberIds: [{ value: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "memberIds",
  });

  // state で管理しないで、params 作る時に計算するで OKっぽい
  const [companyName, setCompanyName] = useState(companies[0].name);
  const [managerName, setManagerName] = useState(members[0].name);

  const onSubmit = async (data) => {
    // TODO サーバーと共通の方定義(とりあえず types.ts でいいや)
    const params = {
      name: data.name,
      companyId: data.companyId,
      companyName,
      managerId: data.managerId,
      managerName,
      members: data.memberIds.map((m) =>
        members.find((mm) => mm.id === m.value)
      ),
    };

    await axios.post("/api/projects", params);
    router.push("/projects");
  };

  return (
    <div>
      <h1>プロジェクト登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="projectName">プロジェクト名</label>
          <input type="text" name="name" id="projectName" ref={register} />
        </div>

        <div>
          <label htmlFor="companyId">企業</label>
          <select
            name="companyId"
            id="companyId"
            ref={register}
            onChange={(e) => {
              setCompanyName(
                companies.find((c) => c.id === e.currentTarget.value).name
              );
            }}
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="managerId">統括</label>
          <select
            name="managerId"
            id="managerId"
            ref={register}
            onChange={(e) => {
              setManagerName(
                members.find((m) => m.id === e.currentTarget.value).name
              );
            }}
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>メンバー</label>
          {fields.map((field, index) => (
            <select
              name={`memberIds[${index}].value`}
              ref={register()}
              key={field.id}
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          ))}

          <button type="button" onClick={() => append({ name: "" })}>
            +
          </button>
        </div>

        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const companies = await new CompanyRepository().getAll();
  const members = await new MemberRepository().getMembers();

  return {
    props: {
      companies,
      members,
    }, // will be passed to the page component as props
  };
};

export default NewProjectsPage;
