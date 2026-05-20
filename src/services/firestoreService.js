import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

// SAVE USER TRANSACTION
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

// GET USER TRANSACTIONS
export async function getTransactions(
  userId
) {
  try {
    const snapshot =
      await getDocs(
        collection(
          db,
          "users",
          userId,
          "transactions"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  } catch (err) {
    console.error(
      "Fetch Error:",
      err
    );

    return [];
  }
}