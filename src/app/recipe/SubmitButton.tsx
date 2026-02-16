"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl transition-all active:scale-[0.98] ${
        pending ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-blue-200"
      }`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          AIが献立を考えています...
        </span>
      ) : (
        <>
          <span className="text-xl">✨</span>
          <span>最新の食材でレシピ提案</span>
        </>
      )}
    </button>
  );
}