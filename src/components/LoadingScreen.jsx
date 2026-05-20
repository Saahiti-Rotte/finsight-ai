export default function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        background: "#f5f7fb",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "34px",

          fontWeight: "800",

          color: "#2563eb",

          marginBottom: "18px",
        }}
      >
        FinSight AI
      </div>

      {/* LOADER */}
      <div
        style={{
          width: "46px",

          height: "46px",

          border:
            "4px solid #dbeafe",

          borderTop:
            "4px solid #2563eb",

          borderRadius: "50%",

          animation:
            "spin 1s linear infinite",
        }}
      />

      {/* TEXT */}
      <div
        style={{
          marginTop: "18px",

          color: "#666",

          fontSize: "14px",
        }}
      >
        Loading your financial
        intelligence dashboard...
      </div>
    </div>
  );
}