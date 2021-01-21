import { firestore } from "../../firebaseAdmin";
import { NpsQuestionDocument } from "../../lib/firestore/documents";
import { NpsQuestion } from "../../models/project";
import { QuerySnapshot } from "@google-cloud/firestore";

export class NpsQuestionRepository {
  async getAll(): Promise<NpsQuestion[]> {
    const qs = (await firestore
      .collection("nps-questions")
      .orderBy("order")
      .get()) as QuerySnapshot<NpsQuestionDocument>;

    return qs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }
}
