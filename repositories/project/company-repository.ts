import { firestore } from "../../firebaseAdmin";
import { Company } from "../../models/company";
import { QuerySnapshot } from "@google-cloud/firestore";
import { CompanyDocument } from "../../lib/firestore/documents";

export class CompanyRepository {
  // 企業一覧を取得する
  async getAll(): Promise<Company[]> {
    const qs = (await firestore
      .collection("companies")
      .get()) as QuerySnapshot<CompanyDocument>;
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
}
