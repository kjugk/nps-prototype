export interface Member {
  id: string;
  name: string;
}

export interface Nps {
  id: string;
  projectId: string;
  projectName: string; // 冗長だけど値を持たせる
  companyId: string;
  companyName: string; // 冗長だけど値を持たせる
  answererName: string;
  answeredAt: string | null;
  memberIds: string[]; // メンバー別 NPS 検索用
  status: "yet" | "done";
  createdAt: string;
  members: {
    // 冗長だけど値を持たせる
    id: string;
    name: string;
  }[];
}

export interface NpsQuestion {
  order: number;
  question: string;
  type: "score" | "text";
}

export interface NpsMemberQuestion {
  order: number;
  question: string;
  type: "score" | "text";
}

export interface NpsAnswer {
  question: string;
  type: "text" | "score";
  answer: string;
  order: number;
}

export interface NpsMemberAnswer {
  memberId: string;
  memberName: string;
  answers: NpsAnswer[];
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  companyName: string; // 冗長だけど値を持たせる
  managerId: string;
  managerName: string;
  members: {
    // 冗長だけど値を持たせる
    id: string;
    name: string;
  }[];
}
