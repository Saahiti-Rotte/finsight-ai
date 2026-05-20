import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

/* -------------------- */
/* TRANSACTIONS */
/* -------------------- */

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

// DELETE TRANSACTION
export async function deleteTransaction(
  userId,
  transactionId
) {
  try {
    await deleteDoc(
      doc(
        db,
        "users",
        userId,
        "transactions",
        transactionId
      )
    );
  } catch (err) {
    console.error(
      "Delete Error:",
      err
    );
  }
}

// UPDATE TRANSACTION
export async function updateTransaction(
  userId,
  transactionId,
  updatedData
) {
  try {
    await updateDoc(
      doc(
        db,
        "users",
        userId,
        "transactions",
        transactionId
      ),
      updatedData
    );
  } catch (err) {
    console.error(
      "Update Error:",
      err
    );
  }
}

/* -------------------- */
/* USER PROFILE */
/* -------------------- */

// SAVE MONTHLY INCOME
export async function saveIncome(
  userId,
  income
) {
  try {
    await setDoc(
      doc(
        db,
        "users",
        userId,
        "profile",
        "financial"
      ),
      {
        monthlyIncome: income,
      }
    );
  } catch (err) {
    console.error(
      "Income Save Error:",
      err
    );
  }
}

// GET MONTHLY INCOME
export async function getIncome(
  userId
) {
  try {
    const ref = doc(
      db,
      "users",
      userId,
      "profile",
      "financial"
    );

    const snapshot =
      await getDoc(ref);

    if (snapshot.exists()) {
      return (
        snapshot.data()
          .monthlyIncome || 0
      );
    }

    return 0;
  } catch (err) {
    console.error(
      "Income Fetch Error:",
      err
    );

    return 0;
  }
}