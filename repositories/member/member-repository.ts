import { MemberDocument } from "../../lib/firestore/documents";
import { firestore } from "../../firebaseAdmin";
import { QuerySnapshot } from "@google-cloud/firestore";
import { Member } from "../../models/project";

export class MemberRepository {
  // 企業一覧を取得する
  async getMembers(): Promise<Member[]> {
    const qs = (await firestore
      .collection("members")
      .get()) as QuerySnapshot<MemberDocument>;

    return qs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
      };
    });
  }
}
