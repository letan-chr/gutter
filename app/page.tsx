import Hero from "@/components/sections/Hero";
import WhyChooseus from "@/components/sections/WhyChooseus";
import Feature from "@/components/sections/Feature";
import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/pages/contacts/Contact";
import Service from "@/components/sections/Service";

import { getBatchData } from "@/api/Api";
import { useEffect, useState } from "react";
import About from "@/components/sections/About";


export default function Home() {
  const features = [
    "features",
    "services",
    "products",
    "blogs",
    "hero",
    "why-choose-us",
    "partners",
    
  ];
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const result = await getBatchData(features);
        setData(result);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };
    fetchData();

  }, []);

  return (
    <>


  <Hero />
  <About />

  <Service />
  <WhyChooseus />
  <Products />

  <Cta />
  <Blog />
  <Partners />
  </>
  );
}
