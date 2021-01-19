import { firestore } from "../../firebaseAdmin";
import { Project } from "../../models/project";
import { QuerySnapshot } from "@google-cloud/firestore";

export class ProjectRepository {
  // プロジェクト一覧を取得する
  async getAll(): Promise<Project[]> {
    const qs = (await firestore
      .collection("projects")
      .get()) as QuerySnapshot<Project>;
    const projects: Project[] = [];

    qs.forEach((ds) => {
      const data = ds.data();
      projects.push({
        id: ds.id,
        name: data.name,
      });
    });

    return projects;
  }
}
