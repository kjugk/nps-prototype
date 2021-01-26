import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebaseAdmin";
import { NpsQuestionRepository } from "../../repositories/nps/nps-question-repository";
import { ProjectRepository } from "../../repositories/project/project-repository";
import {
  NpsAnswerDocument,
  NpsDocument,
  NpsMemberAnswerDocument,
} from "../../lib/firestore/documents";
import {
  CollectionReference,
  DocumentReference,
  Timestamp,
} from "@google-cloud/firestore";

// nps を作成する
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { projectId } = req.body;

    // TODO: Promise.all でとる
    // project 取得
    const project = await new ProjectRepository().getProject(projectId);
    // nps-questions 取得
    const npsQuestions = await new NpsQuestionRepository().getAll();
    // nps-members-questions 取得
    const npsMemberQuestions = await new NpsQuestionRepository().getAllMemberQuestions();

    // nps 作成
    const nps = await (firestore.collection(
      "nps"
    ) as CollectionReference<NpsDocument>).add({
      answererName: "",
      answeredAt: null,
      companyId: project.companyId,
      companyName: project.companyName,
      projectId: project.id,
      projectName: project.name,
      memberIds: project.members.map((m) => m.id),
      members: project.members,
      status: "yet",
      createdAt: Timestamp.fromDate(new Date()),
    });

    const promises = npsQuestions.map((q) => {
      return firestore.collection(`nps/${nps.id}/answers`).add({
        answer: "",
        order: q.order,
        question: q.question,
        type: q.type,
      } as NpsAnswerDocument);
    });

    // メンバー別質問
    const memberPromises: Promise<DocumentReference>[] = [];
    project.members.forEach((member) => {
      npsMemberQuestions.forEach((q) => {
        const doc: NpsMemberAnswerDocument = {
          memberId: member.id,
          memberName: member.name,
          answer: "",
          order: q.order,
          question: q.question,
          type: q.type,
        };

        memberPromises.push(
          firestore.collection(`nps/${nps.id}/member-answers`).add(doc)
        );
      });
    });

    await Promise.all([...promises, ...memberPromises]);

    res.status(200).end();
  } else {
  }
};
