"use client";

import React, { useEffect, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import Team from "@/components/pages/company/Teams/Team";
import { Feature, TeamMember } from "@/types/types";
import { getBatchData } from "@/api/Api";
const page = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_team", amount: 10 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setTeams(data.about_team?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  console.log("teams", teams);

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title="Our Team"
        subtitle="Meet the talented professionals who make excellence possible"
      />
      <Team teams={teams} />
    </>
  );
};

export default page;
