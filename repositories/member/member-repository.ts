import { MemberDocument } from "../../lib/firestore/documents";
import { firestore } from "../../firebaseAdmin";
import { QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";
import { Member } from "../../models/project";

export class MemberRepository {
  // 社員一覧を取得する
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

  async getMember(memberId: string): Promise<Member> {
    const qs = (await firestore
      .collection("members")
      .doc(memberId)
      .get()) as QueryDocumentSnapshot<MemberDocument>;

    const data = qs.data();
    return {
      id: qs.id,
      ...data,
    };
  }
}
