"use client";

import React, { useEffect, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import ServiceDetails from "@/components/pages/service/ServiceDetails";
import { useParams } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/api/Api";
import { resolveService } from "@/lib/resolvers/serviceResolver";
import { ServiceType } from "@/types/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguage();
  const [service, setService] = useState<ServiceType | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceType[]>([]);

  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    if (!normalizedSlug) return;

    async function fetchData() {
      try {
        // 1️⃣ Fetch service by slug
        const serviceRes = await getServiceBySlug(normalizedSlug);
        const resolvedService = resolveService(serviceRes.data, lang);
        setService(resolvedService);

        // 2️⃣ Fetch all services
        const allServicesRes = await getAllServices();
        const resolvedAll = allServicesRes.data.map((s) =>
          resolveService(s, lang)
        );

        // 3️⃣ Related services = all except current, limit 4
        const related = resolvedAll
          .filter((s) => s.slug !== normalizedSlug)
          .slice(0, 4);

        setRelatedServices(related);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [normalizedSlug, lang]);

  if (!service) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === "en" ? "Service not found" : "አገልግሎት አልተገኘም"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump-for-service.jpg"
        title={service.title}
        subtitle="Professional service tailored to your needs"
      />
      <ServiceDetails service={service} relatedServices={relatedServices} />
    </>
  );
};

export default page;
