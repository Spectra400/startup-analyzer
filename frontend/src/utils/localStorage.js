const STORAGE_KEY = 'startup_reports';

export function saveReport(report) {
  const reports = getReports();
  const newReport = {
    id: Date.now(),
    date: report.date || new Date().toISOString(),
    idea: report.idea,
    targetUsers: report.targetUsers,
    country: report.country,
    analysis: report.analysis,
  };
  reports.unshift(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return newReport;
}

export function getReports() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deleteReport(id) {
  const reports = getReports().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function clearReports() {
  localStorage.removeItem(STORAGE_KEY);
}
