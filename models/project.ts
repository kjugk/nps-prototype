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
  answeredAt: number | null;
  createdAt: number; // エポック秒(ミリ秒)
  memberIds: string[]; // メンバー別 NPS 検索用
  status: "yet" | "done";
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
  id: string;
  memberId: string;
  memberName: string;
  question: string;
  type: "text" | "score";
  answer: string;
  order: number;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  companyName: string; // 冗長だけど値を持たせる
  managerId: string;
  managerName: string;
  createdAt: string;
  members: {
    // 冗長だけど値を持たせる
    id: string;
    name: string;
  }[];
}
