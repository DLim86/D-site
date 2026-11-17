const cardContent: Record<string, { title: string; rows: { label: string; status: string; tone: "ok" | "warn" | "info" }[] }> = {
  governance: {
    title: "Access Review · Q2 Close",
    rows: [
      { label: "GL journal posting", status: "Reviewed", tone: "ok" },
      { label: "AP vendor master", status: "Flagged", tone: "warn" },
      { label: "BPC consolidation", status: "Reviewed", tone: "ok" },
      { label: "SOD conflict scan", status: "Passed", tone: "ok" },
    ],
  },
  automation: {
    title: "Invoice Bot · Run #482",
    rows: [
      { label: "Extract line items", status: "Done", tone: "ok" },
      { label: "Match PO / GRN", status: "Done", tone: "ok" },
      { label: "Exception queue", status: "3 items", tone: "warn" },
      { label: "Post to SAP", status: "Queued", tone: "info" },
    ],
  },
  "applied-ai": {
    title: "Model · anomaly-detector v0.3",
    rows: [
      { label: "Precision", status: "0.94", tone: "ok" },
      { label: "Recall", status: "0.89", tone: "ok" },
      { label: "Training set", status: "12 quarters", tone: "info" },
      { label: "Drift check", status: "Scheduled", tone: "info" },
    ],
  },
};

const toneClasses: Record<string, string> = {
  ok: "text-accent border-accent/30 bg-accent-soft",
  warn: "text-secondary border-border-strong bg-elevated-2",
  info: "text-muted border-hairline bg-elevated-2",
};

export default function InterfaceCard({ pillarId }: { pillarId: string }) {
  const data = cardContent[pillarId];
  if (!data) return null;

  return (
    <div
      className="w-full max-w-sm rounded-2xl border border-hairline bg-elevated-2/80 p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{data.title}</p>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <ul className="flex flex-col gap-2.5">
        {data.rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-4 rounded-lg border border-hairline bg-void/40 px-3.5 py-2.5">
            <span className="text-sm text-secondary">{row.label}</span>
            <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] ${toneClasses[row.tone]}`}>
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
