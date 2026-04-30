import { Suspense } from "react";
import BookingSuccessPage from "./page";
import { Loader2 } from "lucide-react";

export default function BookingSuccessLayout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary-900" />
      </div>
    }>
      <BookingSuccessPage />
    </Suspense>
  );
}
