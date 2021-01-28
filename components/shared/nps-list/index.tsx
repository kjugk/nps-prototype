import React, { FC } from "react";
import Link from "next/link";
import { Nps } from "../../../models/project";
import { TableHeader } from "../../table-header";
import { TableCell } from "../../table-cell";
import { Label } from "../../label";

interface Props {
  npsList: Nps[];
}

export const NpsList: FC<Props> = ({ npsList }) => {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-max table-fixed">
        <thead>
          <tr>
            <TableHeader>NPS ID</TableHeader>
            <TableHeader>ステータス</TableHeader>
            <TableHeader>プロジェクト名</TableHeader>
            <TableHeader>回答者名</TableHeader>
            <TableHeader>メンバー</TableHeader>
            <TableHeader>回答日時</TableHeader>
            <TableHeader>作成日時</TableHeader>
          </tr>
        </thead>

        <tbody>
          {npsList.map((nps) => (
            <Link href={`/nps/${nps.id}`} key={nps.id}>
              <tr className="cursor-pointer hover:bg-gray-100">
                <TableCell>
                  <Link href={`/nps/${nps.id}`}>{nps.id}</Link>
                </TableCell>
                <TableCell>
                  {nps.status === "done" ? (
                    <Label>回答済</Label>
                  ) : (
                    <Label variant="warning">未回答</Label>
                  )}
                </TableCell>
                <TableCell>{nps.projectName}</TableCell>
                <TableCell>
                  {nps.answererName === "" ? "-" : nps.answererName}
                </TableCell>
                <TableCell>
                  {nps.members.map((member) => member.name).join(" , ")}
                </TableCell>
                <TableCell>{nps.answeredAt ?? "-"}</TableCell>
                <TableCell>{nps.createdAt ?? "-"}</TableCell>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};
