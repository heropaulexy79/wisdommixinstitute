"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle, Loader2 } from "lucide-react";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");
  const reference = searchParams.get("ref");

  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const [accessStatus, setAccessStatus] = useState<"loading" | "success" | "denied" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize and verify device token
  useEffect(() => {
    if (!bookId || !reference) {
      setAccessStatus("error");
      setErrorMessage("Invalid link parameters.");
      return;
    }

    const verifyAccess = async () => {
      try {
        const tokenKey = `device_token_${bookId}_${reference}`;
        let token = localStorage.getItem(tokenKey);
        
        if (!token) {
          // Generate a random token for this device
          token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          localStorage.setItem(tokenKey, token);
        }
        
        setDeviceToken(token);

        const res = await fetch("/api/books/verify-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: bookId, ref: reference, deviceToken: token }),
        });

        const data = await res.json();

        if (res.ok) {
          setAccessStatus("success");
        } else {
          setAccessStatus("denied");
          setErrorMessage(data.error || "Access denied.");
        }
      } catch (err) {
        console.error("Error verifying access:", err);
        setAccessStatus("error");
        setErrorMessage("An error occurred while verifying access. Please try again.");
      }
    };

    verifyAccess();
  }, [bookId, reference]);

  // Document callbacks
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Prevent right click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    if (accessStatus === "success") {
      document.addEventListener("contextmenu", handleContextMenu);
    }
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [accessStatus]);

  if (accessStatus === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-primary-900 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Verifying access and securing document...</p>
      </div>
    );
  }

  if (accessStatus === "denied" || accessStatus === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          {accessStatus === "denied" && (
            <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              This book has been registered to another device or browser. To protect copyright, purchases are restricted to a single device.
            </p>
          )}
        </div>
      </div>
    );
  }

  const pdfUrl = `/api/books/pdf-proxy?id=${bookId}&ref=${reference}&token=${deviceToken}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col no-select">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-serif font-medium text-lg text-gray-900 truncate max-w-xs hidden sm:block">
            Reader
          </h1>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="p-1.5 rounded text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 text-sm font-medium text-gray-700 min-w-[5rem] text-center">
              {pageNumber} / {numPages || "-"}
            </span>
            <button 
              onClick={() => setPageNumber(p => Math.min(numPages || p, p + 1))}
              disabled={pageNumber >= (numPages || 1)}
              className="p-1.5 rounded text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setScale(s => Math.max(0.5, s - 0.25))}
            className="p-1.5 rounded text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-xs font-medium text-gray-500 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={() => setScale(s => Math.min(3, s + 0.25))}
            className="p-1.5 rounded text-gray-600 hover:bg-white hover:shadow-sm transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reader Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 md:p-8 flex justify-center"
        style={{ userSelect: "none" }}
      >
        <div className="bg-white shadow-lg relative">
          {/* Invisible overlay to block text selection and dragging */}
          <div className="absolute inset-0 z-10"></div>
          
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-primary-900 animate-spin mb-4" />
                <p className="text-gray-500">Loading document...</p>
              </div>
            }
            error={
              <div className="p-20 text-center text-red-500">
                Failed to load the document. It might be unavailable or protected.
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full"
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
