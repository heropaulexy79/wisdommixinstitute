"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="w-10 h-10 text-primary-900 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">Loading secure reader...</p>
    </div>
  ),
});

export default function BookReaderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-primary-900 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Initializing...</p>
      </div>
    }>
      <PdfViewer />
    </Suspense>
  );
}
