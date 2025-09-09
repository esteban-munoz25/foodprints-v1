import React from "react";
import Section from "../../components/Section";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <Section
    id="landing"
    className="flex flex-col items-center justify-center px-76"
  >
    <div className="text-[#FFF4E2]">
      <h1 className="text-3xl font-bold mb-4">Welcome to Foodprints</h1>
      <p className="mb-6">
        Foodprints is a World Food Programme initiative that showcases impactful
        data visualizations to help understand global food systems, nutrition,
        and food security. Explore interactive insights and stories powered by
        real data.
      </p>
      <Link to="/honduras" className="text-blue-500 underline">
        Explore Honduras
      </Link>
      <Link to="/salvador" className="text-blue-500 underline ml-4">
        Explore El Salvador
      </Link>
      <Link to="/guatemala" className="text-blue-500 underline ml-4">
        Explore Guatemala
      </Link>
    </div>
  </Section>
);

export default LandingPage;
