import { FC } from "react";
import Link from "next/link";
import styles from "./breadcrumbs.module.css";

type Item = {
  text: string;
  url?: string;
};

interface Props {
  items: Item[];
}

export const Breadcrumbs: FC<Props> = ({ items }) => {
  return (
    <nav className="text-sm mb-2 flex ">
      {items.map((item, i) =>
        item.url ? (
          <Link href={item.url} key={i}>
            <div className={`${styles.item} ${styles.link}`}>{item.text}</div>
          </Link>
        ) : (
          <div key={i} className={styles.item}>
            {item.text}
          </div>
        )
      )}
    </nav>
  );
};
