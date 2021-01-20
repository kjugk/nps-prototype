import { Timestamp } from "@google-cloud/firestore";
export interface ProjectDocument {
  name: string;
  companyId: string;
  companyName: string;
  managerId: string;
  managerName: string;
}

export interface CompanyDocument {
  name: string;
}

export interface NpsDocument {
  name: string;
  answererName: string;
  answeredAt: Timestamp;
  companyId: string;
  companyName: string;
  projectId: string;
  projectName: string;
  memberIds: string[];
  members: {
    id: string;
    name: string;
  }[];
}
