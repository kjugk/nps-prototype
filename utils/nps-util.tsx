import { Nps } from "../models/project";

import { Label } from "../components/label";

// JSX返さない方がいい?
// JSX 返すのは、shared コンポーネントに切り出す ex. NpsStatusLabel
export const getNpsStatusLabel = (nps: Nps): JSX.Element => {
  return nps.status === "done" ? (
    <Label>回答済</Label>
  ) : (
    <Label variant="warning">未回答</Label>
  );
};
