"use client";

interface AdditionalDetailsProps {
  details?: string | null;
}

export default function AdditionalDetails({ details }: AdditionalDetailsProps) {
  if (!details) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Details</h2>
      <div className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
        {details}
      </div>
    </section>
  );
}
