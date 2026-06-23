"use client";

import { useState, useEffect } from "react";
import { Box, Leaf, ShieldCheck, Utensils, Building2 } from "lucide-react";

interface NavbarLicencesProps {
  activeTab?:
    | "overview"
    | "nutrition"
    | "certifications"
    | "serving"
    | "company";
  onTabChange?: (
    tab: "overview" | "nutrition" | "certifications" | "serving" | "company",
  ) => void;
  isMobileView?: boolean;
  showCertifications?: boolean;
}

export const Navbar = ({
  activeTab = "overview",
  onTabChange,
  isMobileView = false,
  showCertifications = true,
}: NavbarLicencesProps) => {
  const [active, setActive] = useState<
    "overview" | "nutrition" | "certifications" | "serving" | "company"
  >(activeTab);

  const tabs = [
    { id: "overview", label: "Produk", icon: Box },
    { id: "nutrition", label: "Nilai Gizi", icon: Leaf },
    { id: "certifications", label: "Sertifikat", icon: ShieldCheck },
    { id: "serving", label: "Penyajian", icon: Utensils },
    { id: "company", label: "Perusahaan", icon: Building2 },
  ].filter((tab) => showCertifications || tab.id !== "certifications");

  const handleTabChange = (
    tabId: "overview" | "nutrition" | "certifications" | "serving" | "company",
  ) => {
    setActive(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }

    // Desktop view: scroll to section
    if (!isMobileView) {
      const element = document.getElementById(`section-${tabId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Desktop view: detect scroll position
  useEffect(() => {
    if (isMobileView) return;

    const handleScroll = () => {
      const sections: Array<
        "overview" | "nutrition" | "certifications" | "serving" | "company"
      > = showCertifications
        ? ["overview", "nutrition", "certifications", "serving", "company"]
        : ["overview", "nutrition", "serving", "company"];
      let currentSection:
        | "overview"
        | "nutrition"
        | "certifications"
        | "serving"
        | "company" = "overview";

      for (const sectionId of sections) {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = sectionId;
          }
        }
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileView, showCertifications]);

  return (
    <div className="fixed bottom-0 lg:sticky lg:top-0 left-0 right-0 bg-white border-t lg:border-t-0 lg:border-b border-slate-200 z-40">
      <div className="mx-auto px-2 sm:px-4 lg:px-[6%] pt-2 lg:pt-0 pb-0 flex items-end justify-between">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() =>
                handleTabChange(
                  tab.id as
                    | "overview"
                    | "nutrition"
                    | "certifications"
                    | "serving"
                    | "company",
                )
              }
              className={`flex flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 pt-2 lg:pt-4 pb-2 sm:pb-3 lg:pb-4 transition-colors flex-1 border-b-2 ${
                active === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-900"
              }`}
            >
              <IconComponent
                size={20}
                className="sm:size-6"
                strokeWidth={1.5}
              />
              <span className="text-[10px] sm:text-xs lg:text-sm font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
