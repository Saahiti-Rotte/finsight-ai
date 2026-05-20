import { useState } from "react";

import categorizeTransaction from "../utils/categorizeTransaction";

import { saveTransaction } from "../services/firestoreService";

import { auth } from "../firebase";

export default function AddTransaction({
  setTransactions,
}) {
  const [name, setName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!name || !amount) {
      return;
    }

    // CURRENT USER
    const user =
      auth.currentUser;

    if (!user) {
      alert("Not logged in");

      return;
    }

    // AUTO CATEGORY
    const autoCategory =
      categorizeTransaction(name);

    const newTransaction = {
      name,

      category: autoCategory,

      amount: Number(amount),

      income: false,

      date:
        new Date().toLocaleDateString(),
    };

    // UPDATE UI
    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    // SAVE TO USER COLLECTION
    await saveTransaction(
      user.uid,
      newTransaction
    );

    // RESET
    setName("");

    setAmount("");
  };

  return (
    <div className="card">
      <div className="card-title">
        Add Transaction
      </div>

      <form
        onSubmit={handleSubmit}
        className="txn-form"
      >
        <input
          className="txn-input"
          placeholder="Transaction name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="txn-input"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          className="txn-btn"
        >
          Add Transaction
        </button>
      </form>

      <div
        style={{
          marginTop: "12px",

          fontSize: "12px",

          color: "#666",
        }}
      >
        Synced securely to your
        cloud account.
      </div>
    </div>
  );
}