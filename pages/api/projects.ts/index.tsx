import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebaseAdmin";

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
  if (req.method == "POST") {
    const params: Params = req.body;
    console.log(params);

    const doc = await firestore.collection("projects").add(params);

    res.status(200).end(
      JSON.stringify({
        id: doc.id,
      })
    );
  } else {
  }
};
