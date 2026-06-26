"use client";

import { Gift } from "lucide-react";

interface InclusionsListProps {
  items: string[];
}

export default function InclusionsList({ items }: InclusionsListProps) {
  if (!items.length) return null;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <Gift className="h-5 w-5 text-rose-500" />
        What You Get
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600 dark:bg-rose-900 dark:text-rose-300">
              {idx + 1}
            </span>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
