import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebaseAdmin";
import { NpsQuestionRepository } from "../../repositories/nps/nps-question-repository";
import { ProjectRepository } from "../../repositories/project/project-repository";
import { NpsAnswerDocument, NpsDocument } from "../../lib/firestore/documents";
import { CollectionReference } from "@google-cloud/firestore";

// nps を作成する
// usecase に切り出す?
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { projectId } = req.body;
    // project 取得
    const project = await new ProjectRepository().getProject(projectId);
    // nps-questions 取得
    const npsQuestions = await new NpsQuestionRepository().getAll();

    // nps 作成
    const nps = await (firestore.collection(
      "nps-list"
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
    });

    const promises = npsQuestions.map((q) => {
      return firestore.collection(`nps-list/${nps.id}/answers`).add({
        answer: "",
        order: q.order,
        question: q.question,
        type: q.type,
      } as NpsAnswerDocument);
    });

    await Promise.all(promises);

    res.status(200);
  } else {
  }
};
