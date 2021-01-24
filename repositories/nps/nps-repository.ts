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
  async getAllNpsByProject(projectId: string): Promise<Nps[]> {
    const qs = (await firestore
      .collection("nps")
      .where("projectId", "==", projectId)
      .orderBy("createdAt", "desc")
      .get()) as QuerySnapshot<NpsDocument>;

    return qs.docs.map((q) => {
      const data = q.data();
      return {
        id: q.id,
        ...data,
        createdAt: data.createdAt.toDate().toDateString(),
        answeredAt: data.answeredAt?.toDate()?.toDateString() ?? null,
      };
    });
  }

  async getNpsById(npsId: string): Promise<Nps> {
    const qs = (await firestore
      .collection("nps")
      .doc(npsId)
      .get()) as QueryDocumentSnapshot<NpsDocument>;

    const data = qs.data();

    // TODO 変換をfunction にする
    return {
      id: qs.id,
      ...data,
      createdAt: data.createdAt.toDate().toDateString(),
      answeredAt: data.answeredAt?.toDate()?.toDateString() ?? null,
    };
  }

  async getNpsAnswers(npsId: string): Promise<NpsAnswer[]> {
    const qs = (await firestore
      .collection(`nps/${npsId}/answers`)
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
      .collection(`nps/${npsId}/member-answers`)
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
