import React from "react";
import Banner from "../components/Banner";
import SectionBlock from "../components/SectionBlock";
import AccordionSection from "../components/AccordionSection";
import MissionVisionValues from "../components/MissionVisionValues";
import YearSlider from "../components/YearSlider";
import ManufacturingSection from "../components/ManufacturingSection";
import FAQ from "../components/FAQ";

const About = () => {
  return (
    <>
      <Banner
        title="About RoyalFloor"
        subtitle="We deliver excellence in every tile"
        image="/images/END_IBIZA-WHITE.jpg"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "About", link: "/about" },
        ]}
        
      />
      <SectionBlock
        title="Royal Floor has positioned itself as a leader name in the tiles industry known for high quality flooring material."
        image="/images/END_FLORA-GARNET.jpg"
        description="For Royal Floor to become a trusted brand our journey began in a very humble way right from the procurement of materials to processing production and packaging. we’ve handled every step with care and dedication. Our collection includes a wide range of wall and floor tiles wooden panels parking tiles and more designed to suit every style. With a strong network deep expertise and reliable partnerships we ensure every project runs smoothly from start to finish."
      />
      <AccordionSection />
      <MissionVisionValues />
      <YearSlider />
      <ManufacturingSection />
      <FAQ />
    </>
  );
};

export default About;
