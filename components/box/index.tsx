import { FC } from "react";

interface Props {
  noPadding?: boolean;
}

export const Box: FC<Props> = ({ noPadding = false, children }) => {
  const paddingClass = noPadding ? "" : "p-4";

  return <div className={`bg-white mb-8 ${paddingClass}`}>{children}</div>;
};
