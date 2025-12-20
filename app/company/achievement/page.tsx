"use client";

import React, { useEffect, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import Achievement from "@/components/pages/company/achievements/Achievement";
import { AboutAward, Feature, Stat } from "@/types/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getBatchData } from "@/api/Api";
import { resolveStat } from "@/lib/resolvers/resolveStats";
const page = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [awards, setAwards] = useState<AboutAward[]>([]);
  const { language: lang } = useLanguage();

  useEffect(() => {
    const features: Feature[] = [
      { name: "about_award", amount: 10 },
      { name: "about_statistic", amount: 100 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setAwards(data.about_award?.data ?? []);

        const rawStats = data.about_statistic?.data ?? [];

        const resolvedStats = rawStats.map((stat) => resolveStat(stat, lang));

        setStats(resolvedStats);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title="Our Achievements"
        subtitle="Celebrating milestones and successes that define our excellence"
      />
      <Achievement awards={awards} stats={stats} />
    </>
  );
};

export default page;
