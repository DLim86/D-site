export const site = {
  name: "David Lim",
  role: "Finance Systems & Applied AI",
  location: "Singapore",
  email: "davlim86@gmail.com",
  github: "https://github.com/DLim86",
  linkedin: "https://www.linkedin.com/in/david-lim-22814141",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Approach", href: "#approach" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Finance Systems · Applied AI · Singapore",
  headline: ["Ten years automating", "financial systems.", "Now building the", "intelligence behind them."],
  body: "I spent a decade inside finance operations, governance, and RPA — reengineering the processes most people only patch. I'm now completing an applied AI programme to bring that same discipline to machine learning.",
  ctaPrimary: { label: "Get in Touch", href: "#contact" },
  ctaSecondary: { label: "View experience", href: "#about" },
};

export const brandStatement = {
  kicker: "The pattern",
  lines: [
    "Every system I've touched had the same problem:",
    "too much manual judgment standing in for structure.",
    "Automation fixed the structure.",
    "AI is next.",
  ],
};

export type Pillar = {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
};

export const pillars: Pillar[] = [
  {
    id: "governance",
    tag: "01 — Governance",
    title: "Data governance, built to survive an audit",
    description:
      "At DFS Group I lead user access governance and annual reviews across core finance systems — the single point of contact with IT during financial close, responsible for SOD compliance and audit readiness.",
    metrics: [
      { label: "Systems governed", value: "Core finance stack" },
      { label: "Focus", value: "SOD · Audit readiness" },
    ],
  },
  {
    id: "automation",
    tag: "02 — Automation",
    title: "Process automation, from first analysis to deployed bot",
    description:
      "At Singtel I analysed and reengineered finance processes end-to-end, then designed and deployed RPA bots with UiPath and Orchestrator — documenting As-Is/To-Be states and running UAT myself.",
    metrics: [
      { label: "Efficiency gain", value: "+40%" },
      { label: "Tooling", value: "UiPath · Power Automate" },
    ],
  },
  {
    id: "applied-ai",
    tag: "03 — Applied AI",
    title: "Machine learning, grounded in real financial workflows",
    description:
      "I'm completing a six-month full-time applied AI programme at the Singapore Institute of Technology, including NVIDIA Deep Learning Institute modules, building ML and data-engineering solutions with industry partners.",
    metrics: [
      { label: "Programme", value: "SIT · NVIDIA DLI" },
      { label: "Duration", value: "6 months, full-time" },
    ],
  },
];

export type ApproachCard = {
  title: string;
  description: string;
};

export const approach: { kicker: string; heading: string; cards: ApproachCard[] } = {
  kicker: "Where it comes together",
  heading: "Domain knowledge that AI teams usually have to hire around",
  cards: [
    {
      title: "Reads a finance system like an insider",
      description:
        "Ten years across SAP, PeopleSoft, BPC, and Blackline means I know where financial data actually breaks — not just what the schema says.",
    },
    {
      title: "Automates the process, not just the task",
      description:
        "RPA deployments taught me to reengineer the workflow first. A model bolted onto a broken process just fails faster.",
    },
    {
      title: "Treats governance as a feature",
      description:
        "SOD compliance and audit readiness aren't afterthoughts — they're requirements I've owned end-to-end, which matters the moment ML touches financial data.",
    },
    {
      title: "Ships and trains, not just prototypes",
      description:
        "I've trained 50+ employees on new tooling. Technology only counts once the people using it can rely on it.",
    },
  ],
};

export type Metric = {
  value: string;
  label: string;
  context: string;
};

export const results: { kicker: string; heading: string; metrics: Metric[]; statement: string } = {
  kicker: "Evidence",
  heading: "What ten years in the systems actually produced",
  metrics: [
    { value: "40%", label: "Automation efficiency", context: "Process gain from strategic RPA implementation at Singtel" },
    { value: "50+", label: "Employees trained", context: "Power Automate workshops run across teams at DFS Group" },
    { value: "10+", label: "Years in finance systems", context: "Cost control, income audit, reporting, and governance roles" },
    { value: "6", label: "Months, applied AI", context: "Full-time SIT programme with NVIDIA DLI modules" },
  ],
  statement:
    "“The real leverage isn't in the tool — it's in understanding the process well enough to know what should never be manual in the first place.”",
};

export const finalSequence = {
  kicker: "What's next",
  heading: "Looking for AI engineering, data engineering, or intelligent automation roles",
  body: "Roles where finance domain knowledge is an advantage, not a footnote. If that's what you're building, I'd like to talk.",
};

export const cta = {
  heading: "Let's build the next automation.",
  body: "The fastest way to reach me is email or LinkedIn — I typically respond within a day.",
  primary: { label: "Email David", href: `mailto:${site.email}` },
  secondary: [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
  ],
};
