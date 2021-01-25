import { FC } from "react";

type LabelVariant = "primary" | "warning";

interface Props {
  variant?: LabelVariant;
}

export const Label: FC<Props> = ({ variant = "primary", children }) => {
  const c = variant === "primary" ? "bg-blue" : "bg-yellow-500";

  return (
    <div className={`inline-block p-2 text-sm text-white ${c}`}>{children}</div>
  );
};
