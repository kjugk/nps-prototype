import { firestore } from "../../firebaseAdmin";
import { NpsDocument } from "../../lib/firestore/documents";
import { Nps } from "../../models/project";
import { QuerySnapshot } from "@google-cloud/firestore";

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
        answeredAt: data.answeredAt.toDate().toDateString(),
      });
    });

    return npsList;
  }
}
