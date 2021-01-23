import { firestore } from "../../firebaseAdmin";
import {
  NpsDocument,
  NpsAnswerDocument,
  NpsMemberAnswerDocument,
} from "../../lib/firestore/documents";
import { Nps, NpsAnswer, NpsMemberAnswer } from "../../models/project";
import { QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";

export class NpsRepository {
  // 指定されたプロジェクトに紐づくNPS一覧を取得する
  async getAllByProject(projectId: string): Promise<Nps[]> {
    const qs = (await firestore
      .collection("nps-list")
      .where("projectId", "==", projectId)
      .get()) as QuerySnapshot<NpsDocument>;

    const npsList: Nps[] = [];
    qs.forEach((q) => {
      const data = q.data();
      npsList.push({
        id: q.id,
        ...data,
        answeredAt: data.answeredAt?.toDate()?.toDateString() ?? null,
      });
    });

    return npsList;
  }

  async getNpsById(npsId: string): Promise<Nps> {
    const qs = (await firestore
      .collection("nps-list")
      .doc(npsId)
      .get()) as QueryDocumentSnapshot<NpsDocument>;

    const data = qs.data();

    // TODO 変換をfunction にする
    return {
      id: qs.id,
      ...data,
      answeredAt: data.answeredAt?.toDate()?.toDateString() ?? null,
    };
  }

  async getNpsAnswers(npsId: string): Promise<NpsAnswer[]> {
    const qs = (await firestore
      .collection(`nps-list/${npsId}/answers`)
      .orderBy("order")
      .get()) as QuerySnapshot<NpsAnswerDocument>;

    if (qs.empty) return [];

    return qs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }

  async getNpsMemberAnswers(npsId: string): Promise<NpsMemberAnswer[]> {
    const qs = (await firestore
      .collection(`nps-list/${npsId}/member-answers`)
      .get()) as QuerySnapshot<NpsMemberAnswerDocument>;

    if (qs.empty) return [];

    return qs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }
}
