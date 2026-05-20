export default function Topbar({
  openAI,
}) {
  return (
    <div className="topbar">
      <div className="topbar-title">
        Good morning, Saahiti
      </div>

      <div className="topbar-right">
        <button
          className="btn-ai"
          onClick={openAI}
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}