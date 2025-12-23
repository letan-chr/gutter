import { getAllServices, getServiceBySlug } from "@/api/Api";
import Breadcrump from "@/components/layouts/Breadcrump";
import ServiceDetails from "@/components/pages/service/ServiceDetails";
import { getServiceSlug } from "@/lib/utils/getServiceSlug";
import { ServiceType } from "@/types/types";

/**
 * Pre-generate all service slugs at build time
 */
export async function generateStaticParams() {
  const res = await getAllServices();

  return res.data
    .map((service: ServiceType) => {
      const slug = getServiceSlug(service);

      if (!slug) return null;

      return { slug };
    })
    .filter(Boolean) as { slug: string }[];
}

/**
 * Service details page (SERVER COMPONENT)
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const normalizedSlug = slug;

  try {
    // 1️⃣ Fetch RAW service (NO language resolving)
    const serviceRes = await getServiceBySlug(normalizedSlug);
    const service: ServiceType = serviceRes.data;

    // 2️⃣ Fetch RAW services for related services
    const allServicesRes = await getAllServices();
    const relatedServices = allServicesRes.data
      .filter((s: ServiceType) => s.slug !== normalizedSlug)
      .slice(0, 4);

    return (
      <>
        <Breadcrump
          backgroundImage="/assets/images/breadcrump-for-service.jpg"
          title={service.title}
          subtitle="Professional service tailored to your needs"
        />

        {/* ⬇️ PASS RAW DATA */}
        <ServiceDetails
          unResolvedService={service}
          unResolvedRelatedServices={relatedServices}
        />
      </>
    );
  } catch {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Service not found</p>
      </div>
    );
  }
}
