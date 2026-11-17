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
  { label: "Demo", href: "#expertise" },
  { label: "Approach", href: "#approach" },
  { label: "Results", href: "#results" },
  { label: "AI notes", href: "#field-notes" },
];

export const hero = {
  eyebrow: "Finance Systems · Applied AI · Singapore",
  headline: ["Ten years automating", "financial systems.", "Now building the", "intelligence behind them."],
  body: "I spent a decade in finance operations, governance, and RPA, redesigning processes to address recurring problems. I'm now completing an applied AI programme to bring that same discipline to machine learning.",
  ctaPrimary: { label: "Try the finance demo", href: "#expertise" },
  ctaSecondary: { label: "Read my AI notes", href: "#field-notes" },
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
  id: "governance" | "automation" | "applied-ai";
  tag: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
};

export const pillars: Pillar[] = [
  {
    id: "governance",
    tag: "Access review",
    title: "Keep sensitive duties separate.",
    description:
      "At DFS Group I led user access governance and annual reviews across core finance systems. I was the point of contact with IT during financial close and handled SOD compliance and audit readiness.",
    metrics: [
      { label: "Systems governed", value: "Core finance stack" },
      { label: "Focus", value: "SOD · Audit readiness" },
    ],
  },
  {
    id: "automation",
    tag: "Invoice matching",
    title: "Make the exceptions visible.",
    description:
      "At Singtel I analysed and reengineered finance processes end-to-end, then designed and deployed RPA bots with UiPath and Orchestrator. I documented As-Is/To-Be states and ran UAT.",
    metrics: [
      { label: "Built with", value: "UiPath and Orchestrator" },
      { label: "Validated through", value: "User acceptance testing" },
    ],
  },
  {
    id: "applied-ai",
    tag: "Policy answers",
    title: "Show the evidence behind an answer.",
    description:
      "During my SIT SNAIC attachment, I worked on a retrieval-augmented assistant at WizVision. I designed it to cite supporting passages and flag questions it could not answer from the available material.",
    metrics: [
      { label: "Programme", value: "SIT SNAIC" },
      { label: "Project focus", value: "Retrieval and citations" },
    ],
  },
];

export type ApproachCard = {
  title: string;
  description: string;
  example: string;
};

export const approach: { kicker: string; heading: string; cards: ApproachCard[] } = {
  kicker: "Where it comes together",
  heading: "Domain knowledge that AI teams usually have to hire around",
  cards: [
    {
      title: "Reads a finance system like an insider",
      description:
        "Ten years working with SAP, PeopleSoft, BPC, and Blackline taught me where financial data can break in practice.",
      example: "For financial statement casting, I built a check that recomputes totals. A reviewer can trace a mismatch back to its source rather than accept a plausible-looking report.",
    },
    {
      title: "Automates whole workflows",
      description:
        "RPA deployments taught me to reengineer the workflow first. A model bolted onto a broken process just fails faster.",
      example: "For invoice matching at DFS Group, I used Python and OCR to compare PDFs with system records and make the result available to finance users for review.",
    },
    {
      title: "Treats governance as a feature",
      description:
        "I've owned SOD compliance and audit readiness end-to-end. Both matter when machine learning uses financial data.",
      example: "I coordinated finance-system access reviews and worked with IT during close. A workflow has to show who can change data and who reviews the result.",
    },
    {
      title: "Deploys tools and trains the team",
      description:
        "I've trained 50+ employees on new tooling. Technology only counts once the people using it can rely on it.",
      example: "In Power Automate workshops, I helped colleagues build automations they could run and maintain on their own.",
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
    { value: "2", label: "Finance checks built", context: "Invoice matching and financial statement casting at DFS Group" },
    { value: "50+", label: "Employees trained", context: "Power Automate workshops run across teams at DFS Group" },
    { value: "10+", label: "Years in finance systems", context: "Cost control, income audit, reporting, and governance roles" },
    { value: "6", label: "Months, applied AI", context: "Full-time SIT programme with NVIDIA DLI modules" },
  ],
  statement:
    "“Real leverage comes from understanding the process well enough to know what should never be manual in the first place.”",
};

export const finalSequence = {
  kicker: "What's next",
  heading: "Looking for AI engineering, data engineering, or intelligent automation roles",
  body: "Roles where finance domain knowledge is an advantage, not a footnote. If that's what you're building, I'd like to talk.",
};

export const cta = {
  heading: "Let's build the next automation.",
  body: "The fastest way to reach me is email or LinkedIn. I typically respond within a day.",
  primary: { label: "Email David", href: `mailto:${site.email}` },
  secondary: [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
  ],
};
