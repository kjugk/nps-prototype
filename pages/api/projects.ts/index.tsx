import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../lib/firebase/firebaseAdmin";
import { Timestamp } from "@google-cloud/firestore";

interface Params {
  name: string;
  companyName: string;
  companyId: string;
  managerName: string;
  managerId: string;
  members: {
    id: string;
    name: string;
  }[];
}

// project を作成する
// TODO auth
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Params = req.body;
  const doc = await firestore.collection("projects").add({
    ...params,
    createdAt: Timestamp.fromDate(new Date()),
  });

  res.status(200).end(
    JSON.stringify({
      id: doc.id,
    })
  );
};
