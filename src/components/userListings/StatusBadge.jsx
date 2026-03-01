const STATUS_CONFIG = {
  active: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
  sold: {
    label: "Sold",
    className:
      "bg-stone-100 text-stone-500 border border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700",
  },
  rented: {
    label: "Rented",
    className:
      "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  draft: {
    label: "Draft",
    className:
      "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.draft;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {config.label}
    </span>
  );
}
