"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ArrowLeft, Download, Mail } from "lucide-react";
import Link from "next/link";

type Status = "verifying" | "success" | "failed";

export default function PurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<Status>("verifying");
  const [purchaseData, setPurchaseData] = useState<any>(null);

  useEffect(() => {
    if (!reference) { setStatus("failed"); return; }

    const verify = async () => {
      try {
        const res = await fetch("/api/books/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setPurchaseData(data);
          setStatus("success");
          
          // Show download prompt
          setTimeout(() => {
             const confirmDownload = window.confirm(`Your payment for "${data.bookTitle}" was successful! Would you like to download it now?`);
             if (confirmDownload && data.downloadUrl) {
               window.open(data.downloadUrl, "_blank");
             }
          }, 1000);
          
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg">

        {/* Verifying */}
        {status === "verifying" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <Loader2 className="w-16 h-16 text-primary-900 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-medium font-serif italic text-gray-900 mb-3">Verifying your purchase…</h2>
            <p className="text-gray-500 font-light">Securing your copy. Please wait.</p>
          </motion.div>
        )}

        {/* Success */}
        {status === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-20 h-20 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-medium font-serif italic text-gray-900 mb-4">Purchase Successful!</h2>
            <p className="text-gray-500 font-light mb-8 leading-relaxed">
              Thank you for your purchase. A copy of <strong className="text-gray-800">{purchaseData?.bookTitle}</strong> has been sent to your email.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href={purchaseData?.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl"
              >
                <Download className="w-5 h-5" /> Download Now
              </a>
              
              <div className="flex items-center justify-center gap-2 text-primary-900/60 text-xs font-bold uppercase tracking-widest">
                <Mail className="w-4 h-4" /> Check your email for a permanent link
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 text-left mb-8">
               <div className="flex justify-between text-sm mb-4">
                 <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Item</span>
                 <span className="font-semibold text-gray-800">{purchaseData?.bookTitle}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Reference</span>
                 <span className="font-mono text-xs text-gray-600 break-all">{reference}</span>
               </div>
            </div>

            <Link href="/books" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-600 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Library
            </Link>
          </motion.div>
        )}

        {/* Failed */}
        {status === "failed" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-3xl font-medium font-serif italic text-gray-900 mb-4">Verification Failed</h2>
            <p className="text-gray-500 font-light mb-4 leading-relaxed">
              We could not verify your purchase. If you were charged, please contact us with your reference:
            </p>
            {reference && <p className="font-mono text-sm bg-gray-100 rounded-xl px-4 py-3 mb-8 break-all">{reference}</p>}
            <Link href="/books" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl">
              <ArrowLeft className="w-4 h-4" /> Try Again
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
