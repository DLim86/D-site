"use client";

import { useState } from "react";

const financeAmount = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
  currencyDisplay: "code",
  maximumFractionDigits: 2,
});

function Outcome({ warning, title, detail }: { warning: boolean; title: string; detail: string }) {
  return (
    <div className="workflow-outcome" data-warning={warning} role="status">
      <span className="workflow-indicator" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function AccessReview() {
  const [vendorEdit, setVendorEdit] = useState(false);
  return (
    <div className="workflow-demo">
      <h4>Review a role</h4>
      <p>Can a payables reviewer also edit the supplier record?</p>
      <ul className="workflow-records">
        <li><span>Review supplier invoices</span><strong>Granted</strong></li>
        <li>
          <label className="workflow-check">
            <input type="checkbox" checked={vendorEdit} onChange={(event) => setVendorEdit(event.target.checked)} />
            <span>Grant supplier record edits</span>
          </label>
        </li>
      </ul>
      <Outcome
        warning={vendorEdit}
        title={vendorEdit ? "Conflict flagged" : "Permissions separated"}
        detail={vendorEdit
          ? "The same role could edit the supplier and review its invoices. Send the access change for independent review."
          : "The reviewer can check invoices. A different role controls supplier records."}
      />
    </div>
  );
}

const invoiceCases = [
  { label: "Exact match", invoice: 1240, duplicate: false },
  { label: "Duplicate", invoice: 1240, duplicate: true },
  { label: "Amount mismatch", invoice: 1295, duplicate: false },
];

function InvoiceMatch() {
  const [caseIndex, setCaseIndex] = useState(0);
  const sample = invoiceCases[caseIndex];
  const orderAmount = 1240;
  const variance = sample.invoice - orderAmount;
  const title = sample.duplicate ? "Duplicate held" : variance ? "Variance held" : "Ready for review";
  const detail = sample.duplicate
    ? "The supplier and invoice number already exist in the ledger. Matching totals do not clear the duplicate."
    : variance
      ? "The invoice differs from the order by " + financeAmount.format(variance) + ". Route it for reconciliation."
      : "The invoice total matches the order and no duplicate was found. An authorised reviewer still releases it.";

  return (
    <div className="workflow-demo">
      <h4>Test the invoice match</h4>
      <fieldset className="workflow-options">
        <legend>Choose a sample case</legend>
        {invoiceCases.map((invoiceCase, index) => (
          <label key={invoiceCase.label}>
            <input type="radio" name="invoice-sample" checked={caseIndex === index} onChange={() => setCaseIndex(index)} />
            <span>{invoiceCase.label}</span>
          </label>
        ))}
      </fieldset>
      <dl className="workflow-records">
        <div><dt>Purchase order</dt><dd>{financeAmount.format(orderAmount)}</dd></div>
        <div><dt>Invoice total</dt><dd>{financeAmount.format(sample.invoice)}</dd></div>
      </dl>
      <Outcome warning={sample.duplicate || variance !== 0} title={title} detail={detail} />
    </div>
  );
}

const policyCases = [
  {
    question: "Who approves an exception?",
    title: "An independent reviewer",
    detail: "Send the unmatched invoice to an authorised reviewer who did not create it.",
    source: "Example Payments Policy, §2.1",
    excerpt: "The creator of an unmatched invoice cannot approve its exception. An authorised independent reviewer must approve it before release.",
  },
  {
    question: "Can the bot release payment?",
    title: "Payment release requires authority",
    detail: "The matching tool sends the invoice for review. Only a person with payment release authority can release it.",
    source: "Example Payments Policy, §3.2",
    excerpt: "Invoice matching automation can prepare and route a record. Payment release is reserved for users granted release authority.",
  },
  {
    question: "What is the overseas limit?",
    title: "Insufficient evidence",
    detail: "The sample policy does not state an overseas approval limit. Ask the policy owner for the applicable local guidance.",
  },
];

function PolicyAnswers() {
  const [policyIndex, setPolicyIndex] = useState(0);
  const policy = policyCases[policyIndex];
  return (
    <div className="workflow-demo">
      <h4>Ask a policy question</h4>
      <label className="workflow-select">
        <span>Sample question</span>
        <select value={policyIndex} onChange={(event) => setPolicyIndex(Number(event.target.value))}>
          {policyCases.map((item, index) => <option key={item.question} value={index}>{item.question}</option>)}
        </select>
      </label>
      <Outcome warning={!policy.source} title={policy.title} detail={policy.detail} />
      {policy.source && (
        <details className="workflow-source" key={policy.source}>
          <summary>{policy.source}</summary>
          <p>{policy.excerpt}</p>
        </details>
      )}
      <p className="workflow-disclosure">Illustrative policy and answers. No live model or uploaded files.</p>
    </div>
  );
}

const demos = {
  governance: AccessReview,
  automation: InvoiceMatch,
  "applied-ai": PolicyAnswers,
};

export default function InterfaceCard({ pillarId }: { pillarId: keyof typeof demos }) {
  const Demo = demos[pillarId];
  return <Demo />;
}
