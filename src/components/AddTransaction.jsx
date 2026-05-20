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

  const [category, setCategory] =
    useState("");

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !name ||
      !amount
    ) {
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

    // FINAL CATEGORY
    const finalCategory =
      category || autoCategory;

    // TRANSACTION
    const newTransaction = {
      name,

      category:
        finalCategory,

      amount:
        Number(amount),

      income: false,

      date:
        new Date().toLocaleDateString(),
    };

    // UPDATE UI
    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    // SAVE FIRESTORE
    await saveTransaction(
      user.uid,
      newTransaction
    );

    // RESET
    setName("");

    setAmount("");

    setCategory("");
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
        {/* NAME */}
        <input
          className="txn-input"
          placeholder="Transaction name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        {/* AMOUNT */}
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

        {/* CATEGORY */}
        <select
          className="txn-input"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="">
            Auto Detect Category
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Subscription">
            Subscription
          </option>

          <option value="Health">
            Health
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Investment">
            Investment
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* BUTTON */}
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

          color: "#64748b",
        }}
      >
        Transactions sync securely
        to your cloud account in
        real time.
      </div>
    </div>
  );
}