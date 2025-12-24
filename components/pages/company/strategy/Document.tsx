"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Document as DocumentType, DocumentCategory } from "@/types/types";
import { resolveDocument } from "@/lib/resolvers/resolvedDocyument";
import { resolveDocumentCategory } from "@/lib/resolvers/resolveDocumentCategory";

const IMAGE_TYPES = ["jpg", "jpeg", "png"];

const isImage = (type: string) => IMAGE_TYPES.includes(type.toLowerCase());

interface DocumentProps {
  unResolvedDocuments: DocumentType[];
  unResolvedCategories: DocumentCategory[];
}

const Document = ({
  unResolvedDocuments,
  unResolvedCategories,
}: DocumentProps) => {
  const { language: lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  if (!unResolvedDocuments) {
    return null;
  }
  const documents = unResolvedDocuments.map((doc) =>
    resolveDocument(doc, lang)
  );
  const categories = unResolvedCategories.map((cat) =>
    resolveDocumentCategory(cat, lang)
  );

  const filteredDocuments =
    activeCategory === "all"
      ? documents
      : documents.filter((doc) => doc.document_category_id === activeCategory);

  const data = getPageData("document", lang);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(
    null
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const formatFileSize = (sizeInKB: number | string) => {
    const size = typeof sizeInKB === "string" ? Number(sizeInKB) : sizeInKB;

    if (!size || isNaN(size)) return "-";

    if (size < 1024) {
      return `${size.toFixed(0)} KB`;
    }

    const sizeInMB = size / 1024;
    if (sizeInMB < 1024) {
      return `${sizeInMB.toFixed(2)} MB`;
    }

    const sizeInGB = sizeInMB / 1024;
    return `${sizeInGB.toFixed(2)} GB`;
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "ppt":
      case "pptx":
        return "📊";
      case "image":
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📎";
    }
  };

  const getFileTypeLabel = (type: any) => {
    if (!type || typeof type !== "string") return "FILE";

    switch (type.toLowerCase()) {
      case "pdf":
        return "PDF";
      case "jpg":
      case "jpeg":
      case "png":
        return "IMAGE";
      case "doc":
      case "docx":
        return "WORD";
      case "ppt":
      case "pptx":
        return "PPT";
      default:
        return type.toUpperCase();
    }
  };

  const handleViewDocument = (doc: DocumentType) => {
    if (!canViewInline(doc.file_type)) return;
    setSelectedDocument(doc);
    setIsViewerOpen(true);
  };

  const handleDownload = (doc: DocumentType) => {
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${doc.file_path}`;
    link.download = doc.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canViewInline = (type: string) =>
    typeof type === "string" &&
    ["pdf", "jpg", "jpeg", "png"].includes(type.toLowerCase());

  return (
    <>
      <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold
              ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {lang === "en" ? "All" : "ሁሉም"}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold
                ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDocuments.map((doc: DocumentType) => (
              <div
                key={doc.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  {isImage(doc.file_type) ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${doc.file_path}`}
                      alt={doc.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-8xl opacity-30">
                        {getFileIcon(doc.file_type)}
                      </div>
                    </div>
                  )}
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                    {getFileTypeLabel(doc.file_type)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {doc.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{formatFileSize(doc.file_size)}</span>
                    <span>
                      {new Date(doc.created_at).toLocaleDateString(
                        lang === "en" ? "en-US" : "am-ET"
                      )}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {canViewInline(doc.file_type) && (
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg"
                      >
                        {lang === "en" ? "View" : "እይታ"} 👁️
                      </button>
                    )}
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex-1 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <span>{lang === "en" ? "Download" : "ያውርዱ"}</span>
                      <span>⬇️</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Viewer Modal */}
      {isViewerOpen && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  {selectedDocument.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatFileSize(selectedDocument.file_size)} •{" "}
                  {getFileTypeLabel(selectedDocument.file_type)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
                >
                  <span>{lang === "en" ? "Download" : "ያውርዱ"}</span>
                  <span>⬇️</span>
                </button>
                <button
                  onClick={() => setIsViewerOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white p-2 rounded-lg transition-colors duration-300"
                  aria-label={lang === "en" ? "Close" : "ዝጋ"}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="relative w-full h-[calc(90vh-120px)] overflow-auto bg-gray-100 dark:bg-gray-800">
              {selectedDocument.file_type === "jpg" ? (
                <div className="flex items-center justify-center h-full p-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedDocument.file_path}`}
                    alt={selectedDocument.name}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    unoptimized
                  />
                </div>
              ) : selectedDocument.file_type === "pdf" ? (
                <iframe
                  src={selectedDocument.file_path}
                  className="w-full h-full border-0"
                  title={selectedDocument.name}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-8xl mb-4">
                    {getFileIcon(selectedDocument.file_type)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedDocument.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {lang === "en"
                      ? "This file type cannot be viewed inline. Please download to view."
                      : "ይህ የፋይል አይነት በመስመር ላይ ሊታይ አይችልም። ለመመልከት እባክዎ ያውርዱ።"}
                  </p>
                  <button
                    onClick={() => handleDownload(selectedDocument)}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>{lang === "en" ? "Download Now" : "አሁን ያውርዱ"}</span>
                    <span>⬇️</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Document;
