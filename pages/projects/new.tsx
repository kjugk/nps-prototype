import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Company } from "../../models/company";
import { Member } from "../../models/project";
import { MemberRepository } from "../../repositories/member/member-repository";
import { CompanyRepository } from "../../repositories/project/company-repository";
import { PageLayout } from "../../components/page-layout";
import { Button } from "../../components/button";
import { TextField } from "../../components/text-field";
import { SelectBox } from "../../components/select-box";
import { FormLabel } from "../../components/form-label";
import { FormField } from "../../components/form-field";
import { axiosInstance as axios } from "../../lib/axios";

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
    <PageLayout>
      <h1>プロジェクト作成</h1>

      <div className="bg-white mt-4 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <FormLabel htmlFor="projectName" labelText="プロジェクト名" />
            <TextField
              name="name"
              id="projectName"
              inputRef={register({
                required: true,
              })}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="companyId" labelText="企業" />
            <SelectBox
              name="companyId"
              id="companyId"
              inputRef={register()}
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
            </SelectBox>
          </FormField>

          <FormField>
            <FormLabel htmlFor="managerId" labelText="統括" />
            <SelectBox
              name="managerId"
              id="managerId"
              inputRef={register}
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
            </SelectBox>
          </FormField>

          <FormField>
            <FormLabel labelText="メンバー" />
            {fields.map((field, index) => (
              <SelectBox
                id=""
                name={`memberIds[${index}].value`}
                inputRef={register()}
                key={field.id}
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </SelectBox>
            ))}

            <Button type="button" onClick={() => append({ name: "" })}>
              追加
            </Button>
          </FormField>

          <Button type="submit">作成</Button>
        </form>
      </div>
    </PageLayout>
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
