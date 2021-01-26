import { Company } from "../../models/company";
import { CompanyDocument } from "../../lib/firestore/documents";
import { getCollectionSnapShot } from "../../lib/firestore/get-collection-snapshot";
import { firestore } from "../../lib/firebase/firebaseAdmin";
import { DocumentSnapshot } from "@google-cloud/firestore";

export class CompanyRepository {
  // 企業一覧を取得する
  async getAll(): Promise<Company[]> {
    const qs = await getCollectionSnapShot<CompanyDocument>("companies");
    const companies: Company[] = [];

    qs.forEach((ds) => {
      const data = ds.data();
      companies.push({
        id: ds.id,
        name: data.name,
      });
    });

    return companies;
  }

  // ID で指定された企業を取得する
  async getCompany(id: string): Promise<Company> {
    const docRef = firestore.collection("companies").doc(id);
    const doc = (await docRef.get()) as DocumentSnapshot<Company>;
    // TODO 存在チェック

    return doc.data();
  }
}
