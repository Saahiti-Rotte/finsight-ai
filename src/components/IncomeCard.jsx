import { useState } from "react";

import {
  saveIncome,
} from "../services/firestoreService";

export default function IncomeCard({
  monthlyIncome,
  setMonthlyIncome,
  user,
}) {
  const [incomeInput, setIncomeInput] =
    useState(
      monthlyIncome || ""
    );

  const handleSave =
    async () => {
      if (!incomeInput) return;

      const incomeValue =
        Number(incomeInput);

      // UPDATE UI
      setMonthlyIncome(
        incomeValue
      );

      // SAVE TO FIRESTORE
      await saveIncome(
        user.uid,
        incomeValue
      );

      alert(
        "Monthly income updated successfully."
      );
    };

  return (
    <div className="card">
      <div className="card-title">
        Monthly Income
      </div>

      <div
        style={{
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontSize: "34px",

            fontWeight: "800",

            color: "#2563eb",
          }}
        >
          ₹
          {monthlyIncome.toLocaleString(
            "en-IN"
          )}
        </div>

        <div
          style={{
            color: "#64748b",

            marginTop: "6px",

            fontSize: "14px",
          }}
        >
          Your active monthly
          income used for
          budgeting and savings
          analytics.
        </div>
      </div>

      <div className="txn-form">
        <input
          type="number"
          className="txn-input"
          placeholder="Enter monthly income"
          value={incomeInput}
          onChange={(e) =>
            setIncomeInput(
              e.target.value
            )
          }
        />

        <button
          className="txn-btn"
          onClick={handleSave}
        >
          Save Income
        </button>
      </div>
    </div>
  );
}