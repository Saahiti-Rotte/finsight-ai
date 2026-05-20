import { signOut } from "firebase/auth";

import { auth } from "../firebase";

export default function Topbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div>
        <div className="top-title">
          FinSight AI
        </div>

        <div className="top-sub">
          AI-powered financial
          intelligence platform
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div className="user-pill">
          Connected
        </div>

        <button
          onClick={handleLogout}
          className="txn-btn"
          style={{
            padding:
              "8px 14px",

            fontSize: "12px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}