export default function Sidebar({
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="logo">
        FinSight AI
        <span>
          Expense Intelligence
        </span>
      </div>

      {/* NAVIGATION */}
      <div className="nav-group">
        CORE
      </div>

      {/* DASHBOARD */}
      <button
        className={`nav-item ${
          currentPage === "dashboard"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setCurrentPage(
            "dashboard"
          )
        }
      >
        Dashboard
      </button>

      {/* TRANSACTIONS */}
      <button
        className={`nav-item ${
          currentPage ===
          "transactions"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setCurrentPage(
            "transactions"
          )
        }
      >
        Transactions
      </button>

      {/* ANALYTICS */}
      <button
        className={`nav-item ${
          currentPage ===
          "analytics"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setCurrentPage(
            "analytics"
          )
        }
      >
        Analytics
      </button>

      {/* AI PAGE */}
      <button
        className={`nav-item ${
          currentPage === "ai"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setCurrentPage("ai")
        }
      >
        AI Assistant
      </button>
    </div>
  );
}