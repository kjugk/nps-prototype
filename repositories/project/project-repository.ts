import { Project } from "../../models/project";
import { ProjectDocument } from "../../lib/firestore/documents";
import { getCollectionSnapShot } from "../../lib/firestore/get-collection-snapshot";

export class ProjectRepository {
  // プロジェクト一覧を取得する
  async getAll(): Promise<Project[]> {
    const qs = await getCollectionSnapShot<ProjectDocument>("projects");
    const projects: Project[] = [];

    qs.forEach((ds) => {
      const data = ds.data();

      projects.push({
        id: ds.id,
        name: data.name,
        companyId: data.companyId,
        companyName: data.companyName,
      });
    });

    return projects;
  }
}
