import Hero from "@/components/sections/Hero";
import WhyChooseus from "@/components/sections/WhyChooseus";
import Feature from "@/components/sections/Feature";
import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/pages/contacts/Contact";
import Service from "@/components/sections/Service";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
  <Hero />
  <Feature />
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
