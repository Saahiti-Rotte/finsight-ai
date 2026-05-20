import {
  useState,
} from "react";

import {
  deleteTransaction,
  updateTransaction,
} from "../services/firestoreService";

import { auth } from "../firebase";

export default function Transactions({
  transactions,
}) {
  const [editingId, setEditingId] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editAmount, setEditAmount] =
    useState("");

  // DELETE
  const handleDelete =
    async (id) => {
      const user =
        auth.currentUser;

      if (!user) return;

      await deleteTransaction(
        user.uid,
        id
      );
    };

  // START EDIT
  const startEdit = (txn) => {
    setEditingId(txn.id);

    setEditName(txn.name);

    setEditAmount(txn.amount);
  };

  // SAVE EDIT
  const saveEdit =
    async (id) => {
      const user =
        auth.currentUser;

      if (!user) return;

      await updateTransaction(
        user.uid,
        id,
        {
          name: editName,
          amount:
            Number(editAmount),
        }
      );

      setEditingId(null);
    };

  return (
    <div className="card">
      <div className="card-title">
        Recent Transactions
      </div>

      {transactions.length ===
      0 ? (
        <div
          style={{
            color: "#64748b",
          }}
        >
          No transactions yet.
        </div>
      ) : (
        transactions.map((t) => (
          <div
            key={t.id}
            className="txn"
          >
            {/* LEFT */}
            <div
              style={{
                flex: 1,
              }}
            >
              {editingId ===
              t.id ? (
                <>
                  <input
                    className="txn-input"
                    value={
                      editName
                    }
                    onChange={(
                      e
                    ) =>
                      setEditName(
                        e.target
                          .value
                      )
                    }
                    style={{
                      marginBottom:
                        "8px",
                    }}
                  />

                  <input
                    className="txn-input"
                    type="number"
                    value={
                      editAmount
                    }
                    onChange={(
                      e
                    ) =>
                      setEditAmount(
                        e.target
                          .value
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <div className="txn-name">
                    {t.name}
                  </div>

                  <div className="txn-cat">
                    {t.category}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT */}
            <div
              style={{
                display: "flex",

                alignItems:
                  "center",

                gap: "10px",

                marginLeft:
                  "18px",
              }}
            >
              {editingId ===
              t.id ? (
                <button
                  className="txn-btn"
                  onClick={() =>
                    saveEdit(
                      t.id
                    )
                  }
                >
                  Save
                </button>
              ) : (
                <>
                  <div className="txn-amt">
                    ₹
                    {t.amount.toLocaleString(
                      "en-IN"
                    )}
                  </div>

                  <button
                    className="txn-btn"
                    onClick={() =>
                      startEdit(
                        t
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        t.id
                      )
                    }
                    style={{
                      background:
                        "#ef4444",

                      border:
                        "none",

                      color:
                        "white",

                      padding:
                        "12px",

                      borderRadius:
                        "12px",

                      cursor:
                        "pointer",

                      fontWeight:
                        "700",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}