import { Project } from "../../models/project";
import { ProjectDocument } from "../../lib/firestore/documents";
import { getCollectionSnapShot } from "../../lib/firestore/get-collection-snapshot";
import { firestore } from "../../firebaseAdmin";
import { QuerySnapshot } from "@google-cloud/firestore";

export class ProjectRepository {
  // プロジェクト一覧を取得する
  async getAll(): Promise<Project[]> {
    const qs = await getCollectionSnapShot<ProjectDocument>("projects");
    const projects: Project[] = [];

    qs.forEach((ds) => {
      const data = ds.data();

      projects.push({
        id: ds.id,
        ...data,
      });
    });

    return projects;
  }

  async getByCompanyId(companyId: string): Promise<Project[]> {
    const snapshot = (await firestore
      .collection("projects")
      .where("companyId", "==", companyId)
      .get()) as QuerySnapshot<ProjectDocument>;

    if (snapshot.empty) return [];

    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
      };
    });
  }
}
