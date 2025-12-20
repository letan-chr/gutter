"use client";

import React, { useEffect, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import Team from "@/components/pages/company/Teams/Team";
import { Feature, Stat, TeamMember } from "@/types/types";
import { getBatchData } from "@/api/Api";
import { resolveStat } from "@/lib/resolvers/resolveStats";
import { useLanguage } from "@/components/providers/LanguageProvider";
const page = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const { language: lang } = useLanguage();

  useEffect(() => {
    const features: Feature[] = [
      { name: "about_team", amount: 10 },
      { name: "about_statistic", amount: 100 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setTeams(data.about_team?.data ?? []);

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
        title="Our Team"
        subtitle="Meet the talented professionals who make excellence possible"
      />
      <Team teams={teams} stats={stats} />
    </>
  );
};

export default page;
