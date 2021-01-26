import { Project } from "../../models/project";
import { ProjectDocument } from "../../lib/firestore/documents";
import { firestore } from "../../firebaseAdmin";
import { QuerySnapshot, DocumentSnapshot } from "@google-cloud/firestore";

// クラスにする必要ある?
// Interface 定義するわけじゃないし、モジュールでいいかも。
export class ProjectRepository {
  // プロジェクト一覧を取得する
  async getAll(): Promise<Project[]> {
    const qs = (await firestore
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get()) as QuerySnapshot<ProjectDocument>;

    const projects: Project[] = [];

    qs.forEach((ds) => {
      const data = ds.data();

      projects.push({
        id: ds.id,
        ...data,
        createdAt: data.createdAt?.toDate()?.toDateString() || "",
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
        createdAt: data.createdAt?.toDate()?.toDateString() || "",
      };
    });
  }

  async getProject(projectId: string): Promise<Project> {
    const snapshot = (await firestore
      .collection("projects")
      .doc(projectId)
      .get()) as DocumentSnapshot<ProjectDocument>;

    const data = snapshot.data();

    return {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate()?.toDateString() || "",
    };
  }
}
