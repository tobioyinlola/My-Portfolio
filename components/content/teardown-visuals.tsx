type Product = "stripe" | "frappe" | "openwebui";

const flows: Record<Product, { title: string; steps: { owner: string; title: string; detail: string }[]; boundary: string }> = {
  stripe: {
    title: "A payment has two completion paths",
    steps: [
      { owner: "Merchant", title: "Create an order", detail: "Store the price and order reference on the server." },
      { owner: "Stripe Checkout", title: "Collect payment", detail: "The buyer chooses a method and completes any authentication." },
      { owner: "Buyer’s browser", title: "Return to the store", detail: "Show order status. A redirect alone is not payment proof." },
      { owner: "Merchant’s server", title: "Confirm and fulfil", detail: "Verify payment events and fulfil each order once." },
    ],
    boundary: "The browser return and server notification can arrive independently. The order must remain correct when either is late, repeated or missing.",
  },
  frappe: {
    title: "Hiring progress crosses people and records",
    steps: [
      { owner: "Recruiter", title: "Review an applicant", detail: "Connect the application, opening and supporting evidence." },
      { owner: "Interview panel", title: "Record feedback", detail: "Collect individual assessments and identify missing responses." },
      { owner: "Hiring team", title: "Make a decision", detail: "Resolve conflicting evidence and record the next action." },
      { owner: "HR operations", title: "Prepare the hire", detail: "Link the offer to onboarding activities and the joining date." },
    ],
    boundary: "Proposed product lens: every transition needs a named owner, a next action and an expected date. A saved status alone cannot coordinate the handoff.",
  },
  openwebui: {
    title: "From an uploaded file to a usable answer",
    steps: [
      { owner: "Workspace member", title: "Choose a source", detail: "Select a permitted file or knowledge collection." },
      { owner: "Processing layer", title: "Prepare the content", detail: "Extract and index the source; expose failures and readiness." },
      { owner: "Retrieval + model", title: "Draft an answer", detail: "Retrieve permitted context and generate a response." },
      { owner: "Workspace member", title: "Verify and use", detail: "Check supporting passages, resolve gaps and complete the task." },
    ],
    boundary: "Upload success, indexing success, relevant retrieval and a supported answer are separate states. The product should help a user distinguish them.",
  },
};

export function TeardownFlow({ product }: { product: Product }) {
  const flow = flows[product];
  return (
    <figure className="my-8 rounded-3xl border-2 border-line bg-surface p-5 sm:p-7">
      <figcaption className="mb-5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Journey diagram · editorial analysis</span>
        <span className="mt-2 block font-display text-2xl font-extrabold leading-tight">{flow.title}</span>
      </figcaption>
      <ol className="!m-0 grid !list-none gap-3 !p-0 sm:grid-cols-2">
        {flow.steps.map((step, index) => (
          <li key={step.title} className="!m-0 rounded-2xl border-2 border-line bg-cream p-4 text-[#16130f]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">0{index + 1} → {step.owner}</span>
            <span className="mt-2 block font-display text-xl font-extrabold">{step.title}</span>
            <p className="mt-2 text-sm leading-relaxed">{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t-2 border-line pt-4 text-sm leading-relaxed">{flow.boundary}</p>
    </figure>
  );
}

const concepts: Record<Product, { title: string; kicker: string; heading: string; status: string; rows: [string, string][]; actions: string[]; rationale: string }> = {
  stripe: {
    title: "A receipt that can honestly say “still checking”",
    kicker: "Example store · Order EX-2048",
    heading: "We’re checking your payment",
    status: "Confirmation pending",
    rows: [["What we know", "Your checkout is complete. Payment confirmation is still being checked."], ["What happens next", "This order will update when we receive the result."], ["If you need help", "Use order EX-2048. Check this order before starting another payment."]],
    actions: ["Check order status", "Get help with this order"],
    rationale: "Proposed merchant-side concept. The copy must reflect the actual payment state; it must never claim funds were received from a browser return alone.",
  },
  frappe: {
    title: "A work queue organised around the next decision",
    kicker: "Recruiting operations · Illustrative data",
    heading: "Decisions waiting on you",
    status: "2 handoffs need attention",
    rows: [["Application A · Backend engineer", "Interview finished · panel feedback incomplete · owner: recruiting coordinator"], ["Application B · Product designer", "Feedback complete · decision due today · owner: hiring manager"], ["New hire C · Operations", "Offer linked · joining date in 5 days · equipment task unassigned"]],
    actions: ["Inspect missing feedback", "Review onboarding tasks"],
    rationale: "Proposed cross-record view. Each item should open existing evidence and actions, respecting the viewer’s permissions. Example people and counts are fictional.",
  },
  openwebui: {
    title: "Make the answer’s evidence boundary visible",
    kicker: "Workspace assistant · Illustrative policy task",
    heading: "Answer from the approved policy",
    status: "Source ready · one unresolved question",
    rows: [["Selected source", "Travel policy · version 3 · indexed successfully"], ["Supported answer", "The example policy permits standard rail travel. Inspect the supporting passage before using this answer."], ["Not established", "This source does not say whether an exception applies to your journey. Ask the policy owner."]],
    actions: ["Inspect supporting passage", "Report a source problem"],
    rationale: "Proposed source-first concept, not an actual Open WebUI screenshot. A displayed source or model confidence score is not a guarantee that the answer is correct.",
  },
};

export function TeardownConcept({ product }: { product: Product }) {
  const concept = concepts[product];
  return (
    <figure className="my-8 overflow-hidden rounded-3xl border-2 border-line bg-surface shadow-[0_6px_0_var(--line)]">
      <figcaption className="border-b-2 border-line bg-mustard p-5 text-[#16130f]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">Proposed wireframe · static illustration</span>
        <span className="mt-2 block font-display text-2xl font-extrabold leading-tight">{concept.title}</span>
      </figcaption>
      <div className="p-5 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{concept.kicker}</p>
        <p className="mt-3 font-display text-2xl font-extrabold leading-tight">{concept.heading}</p>
        <p className="mt-3 inline-block rounded-full border-2 border-line px-3 py-1 text-xs font-bold">{concept.status}</p>
        <dl className="mt-5 space-y-4">
          {concept.rows.map(([label, value]) => (
            <div key={label} className="border-t border-line pt-3">
              <dt className="text-sm font-bold">{label}</dt>
              <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Suggested actions, shown as a static wireframe">
          {concept.actions.map((action) => <span key={action} className="rounded-xl border-2 border-line bg-cream px-3 py-2 text-sm font-bold text-[#16130f]">{action}</span>)}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">{concept.rationale}</p>
      </div>
    </figure>
  );
}
