import { firestore } from "../../lib/firebase/firebaseAdmin";
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
        createdAt: data.createdAt.toMillis(),
        answeredAt: data.answeredAt?.toMillis() ?? null,
      };
    });
  }

  // 指定されたメンバーに紐づくNPS一覧を取得する
  async getAllNpsByMember(memberId: string): Promise<Nps[]> {
    const qs = (await firestore
      .collection("nps")
      .where("memberIds", "array-contains", memberId)
      .orderBy("createdAt", "desc")
      .get()) as QuerySnapshot<NpsDocument>;

    return qs.docs.map((q) => {
      const data = q.data();
      return {
        id: q.id,
        ...data,
        createdAt: data.createdAt.toMillis(),
        answeredAt: data.answeredAt?.toMillis() ?? null,
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
      createdAt: data.createdAt.toMillis(),
      answeredAt: data.answeredAt?.toMillis() ?? null,
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

  async getNpsMemberAnswers(
    npsId: string
  ): Promise<{
    [memberId: string]: NpsMemberAnswer[];
  }> {
    const qs = (await firestore
      .collection(`nps/${npsId}/member-answers`)
      .orderBy("order")
      .get()) as QuerySnapshot<NpsMemberAnswerDocument>;

    if (qs.empty) return {};

    // normalize する
    const res: { [memberId: string]: NpsMemberAnswer[] } = {};
    qs.docs.forEach((d) => {
      const data = d.data();

      if (res[data.memberId]) {
        res[data.memberId].push({
          id: d.id,
          ...data,
        });
      } else {
        res[data.memberId] = [
          {
            id: d.id,
            ...data,
          },
        ];
      }
    });

    return res;
  }
}
