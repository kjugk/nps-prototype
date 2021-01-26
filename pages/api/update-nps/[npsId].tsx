import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../lib/firebase/firebaseAdmin";
import { NpsRepository } from "../../../repositories/nps/nps-repository";
import { Timestamp } from "@google-cloud/firestore";

interface Params {
  answererName: string;
  answers: [
    {
      answerId: string;
      answer: string;
    }
  ];
  memberAnswers: [
    {
      id: string;
      answer: string;
    }
  ];
}

// nps を作成する
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "PUT") {
    let { npsId } = req.query;
    const params: Params = req.body;

    npsId = Array.isArray(npsId) ? npsId[0] : npsId;

    // nps 取得
    const project = await new NpsRepository().getNpsById(npsId);
    // TODO 存在確認

    const batch = firestore.batch();

    // nps update
    const npsRef = firestore.collection("nps").doc(npsId);
    batch.update(npsRef, {
      answererName: params.answererName,
      answeredAt: Timestamp.fromDate(new Date()),
      status: "done",
    });

    // nps-answers update
    params.answers.forEach((a) => {
      const ref = firestore.collection(`nps/${npsId}/answers`).doc(a.answerId);

      batch.update(ref, {
        answer: a.answer,
      });
    });

    // member-answers update
    params.memberAnswers.forEach((a) => {
      const ref = firestore.collection(`nps/${npsId}/member-answers`).doc(a.id);

      batch.update(ref, {
        answer: a.answer,
      });
    });

    await batch.commit();

    res.status(200).end();
  } else {
  }
};
