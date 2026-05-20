export default function KPICard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="kpi">
      <div className="kpi-label">
        {title}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-sub">
        {subtitle}
      </div>
    </div>
  );
}