import { Timestamp } from "@google-cloud/firestore";

export interface ProjectDocument {
  name: string;
  companyId: string;
  companyName: string;
  managerId: string;
  managerName: string;
  members: {
    id: string;
    name: string;
  }[];
}

export interface CompanyDocument {
  name: string;
}

export interface NpsDocument {
  answererName: string;
  answeredAt: Timestamp | null;
  companyId: string;
  companyName: string;
  projectId: string;
  projectName: string;
  memberIds: string[];
  status: "yet" | "done";
  members: {
    id: string;
    name: string;
  }[];
}

export interface NpsQuestionDocument {
  order: number;
  question: string;
  type: "score" | "text";
}

export interface NpsMemberQuestionDocument {
  order: number;
  question: string;
  type: "score" | "text";
}

export interface NpsAnswerDocument {
  question: string;
  type: "text" | "score";
  answer: string;
  order: number;
}

export interface NpsMemberAnswerDocument {
  memberId: string;
  memberName: string;
  answers: NpsAnswerDocument[];
}
