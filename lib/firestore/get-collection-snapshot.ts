import { firestore } from "../../firebaseAdmin";
import { QuerySnapshot } from "@google-cloud/firestore";

export const getCollectionSnapShot = async <T>(collectionName: string) => {
  return (await firestore.collection(collectionName).get()) as QuerySnapshot<T>;
};
