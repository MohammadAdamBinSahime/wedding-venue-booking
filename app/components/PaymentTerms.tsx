"use client";

import { ClipboardList } from "lucide-react";

interface PaymentTermsProps {
  terms: string[];
}

export default function PaymentTerms({ terms }: PaymentTermsProps) {
  if (!terms.length) return null;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <ClipboardList className="h-5 w-5 text-rose-500" />
        Terms of Payment
      </h3>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {terms.map((term, idx) => (
          <li key={idx}>{term}</li>
        ))}
      </ol>
    </div>
  );
}
