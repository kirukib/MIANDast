/**
 * Report store for the dash ↔ iframe skeleton.
 * Swap persist/list/upsert for real API calls when wiring.
 */

export type ReportStatus = "draft" | "generating" | "ready" | "shared" | "archived";

export type Report = {
  id: string;
  title: string;
  target: string;
  status: ReportStatus;
  grade: string | null;
  score: number | null;
  findings: number;
  createdAt: string;
  updatedAt: string;
  embedOrigin?: string;
  notes?: string;
};

export const REPORTS_KEY = "mian-dast-reports";
export const REPORTS_CHANNEL = "mian-dast-reports";
export const REPORT_MSG_SOURCE = "mian-dast";

export type ReportMessage =
  | { source: typeof REPORT_MSG_SOURCE; type: "report:upsert"; report: Report }
  | { source: typeof REPORT_MSG_SOURCE; type: "report:delete"; id: string }
  | { source: typeof REPORT_MSG_SOURCE; type: "report:list-request" };

const SAMPLE: Report[] = [
  {
    id: "rpt_sample_cloudpay",
    title: "CloudPay checkout BOLA",
    target: "api.cloudpay.sample",
    status: "ready",
    grade: "B",
    score: 78,
    findings: 12,
    createdAt: "2026-09-20T10:00:00.000Z",
    updatedAt: "2026-09-20T12:30:00.000Z",
    notes: "SAMPLE — replace with live embed payloads",
  },
  {
    id: "rpt_sample_omni",
    title: "OmniHealth FHIR surface",
    target: "fhir.omni.sample",
    status: "shared",
    grade: "A",
    score: 91,
    findings: 4,
    createdAt: "2026-09-18T08:00:00.000Z",
    updatedAt: "2026-09-19T16:00:00.000Z",
  },
];

export function listReports(): Report[] {
  if (typeof window === "undefined") return SAMPLE;
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    if (!raw) {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(SAMPLE));
      return SAMPLE;
    }
    return JSON.parse(raw) as Report[];
  } catch {
    return SAMPLE;
  }
}

export function getReport(id: string): Report | undefined {
  return listReports().find((r) => r.id === id);
}

export function upsertReport(report: Report): Report {
  const next = [...listReports().filter((r) => r.id !== report.id), report].sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
  );
  persist(next);
  broadcast({ source: REPORT_MSG_SOURCE, type: "report:upsert", report });
  return report;
}

export function deleteReport(id: string) {
  persist(listReports().filter((r) => r.id !== id));
  broadcast({ source: REPORT_MSG_SOURCE, type: "report:delete", id });
}

export function archiveReport(id: string) {
  const r = getReport(id);
  if (!r) return;
  upsertReport({ ...r, status: "archived", updatedAt: new Date().toISOString() });
}

export function createReportFromEmbed(input: {
  title?: string;
  target: string;
  grade?: string;
  score?: number;
  findings?: number;
}): Report {
  const now = new Date().toISOString();
  const report: Report = {
    id: `rpt_${Date.now().toString(36)}`,
    title: input.title?.trim() || `Report · ${input.target}`,
    target: input.target.trim(),
    status: "ready",
    grade: input.grade ?? "A",
    score: input.score ?? 90,
    findings: input.findings ?? 0,
    createdAt: now,
    updatedAt: now,
    embedOrigin: typeof window !== "undefined" ? window.location.origin : undefined,
  };
  return upsertReport(report);
}

function persist(reports: Report[]) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

function broadcast(msg: ReportMessage) {
  try {
    new BroadcastChannel(REPORTS_CHANNEL).postMessage(msg);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined" && window.parent && window.parent !== window) {
    window.parent.postMessage(msg, "*");
  }
}

export function isReportMessage(data: unknown): data is ReportMessage {
  return (
    !!data &&
    typeof data === "object" &&
    (data as ReportMessage).source === REPORT_MSG_SOURCE &&
    "type" in (data as object)
  );
}

export function subscribeReports(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === REPORTS_KEY) onChange();
  };
  const onMsg = (e: MessageEvent) => {
    if (isReportMessage(e.data)) onChange();
  };
  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(REPORTS_CHANNEL);
    channel.onmessage = () => onChange();
  } catch {
    /* ignore */
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener("message", onMsg);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("message", onMsg);
    channel?.close();
  };
}
