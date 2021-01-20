export interface Member {
  id: string;
  name: string;
}

export interface Nps {
  memberIds: string[]; // メンバー別 NPS 検索用
  members: {
    // 冗長だけど値を持たせる
    memberId: string;
    name: string;
  }[];
  projectId: string;
  projectName: string; // 冗長だけど値を持たせる
  companyId: string;
  companyName: string; // 冗長だけど値を持たせる
  answererName: string;
  answeredAt: string;
  score: number;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  companyName: string; // 冗長だけど値を持たせる
  managerId: string;
  managerName: string;
}
