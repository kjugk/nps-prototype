import dayjs from "dayjs";

export const formatMilliSec = (millis: number) => {
  return dayjs(millis).format("YYYY-MM-DD");
};
