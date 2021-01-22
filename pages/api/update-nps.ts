import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebaseAdmin";
import { NpsRepository } from "../../repositories/nps/nps-repository";

interface Params {
  answererName: string;
  answers: [
    {
      answerId: string;
      answer: string;
    }
  ];
}

// nps を作成する
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "PUT") {
    const npsId = req.body.npsId;
    const params: Params = req.body.params;

    let batch = firestore.batch();
    // nps 取得
    const project = await new NpsRepository().getNpsById(npsId);
    // TODO 存在確認

    // nps update
    const npsRef = firestore.collection("nps-list").doc(npsId);
    batch.update(npsRef, {
      answererName: params.answererName,
    });

    // nps-answers update
    params.answers.forEach((a) => {
      const ref = firestore
        .collection(`nps-list/${npsId}/answers`)
        .doc(a.answerId);

      batch.update(ref, {
        answer: a.answer,
      });
    });

    await batch.commit();

    res.status(200);
  } else {
  }
};
