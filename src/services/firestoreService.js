import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

// SAVE TRANSACTION
export async function saveTransaction(
  userId,
  transaction
) {
  try {
    await addDoc(
      collection(
        db,
        "users",
        userId,
        "transactions"
      ),
      transaction
    );
  } catch (err) {
    console.error(
      "Save Error:",
      err
    );
  }
}

// REALTIME TRANSACTIONS
export function subscribeToTransactions(
  userId,
  callback
) {
  return onSnapshot(
    collection(
      db,
      "users",
      userId,
      "transactions"
    ),
    (snapshot) => {
      const transactions =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      callback(transactions);
    }
  );
}