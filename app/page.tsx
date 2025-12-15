'use client';
import Hero from "@/components/sections/Hero";
import WhyChooseus from "@/components/sections/WhyChooseus";

import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Blog from "@/components/sections/Blog";
import Service from "@/components/sections/Service";
import About from "@/components/sections/About";


export default function Home() {
  // const features = [
  //   "features",
  //   "services",
  //   "products",
  //   "blogs",
  //   "hero",
  //   "why-choose-us",
  //   "partners",
    
  // ];
  // const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try { 
  //       const result = await getBatchData(features);
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching batch data:", error);
  //     }
  //   };
  //   fetchData();

  // }, []);

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
