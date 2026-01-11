import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyUs } from "@/components/home/WhyUs";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <ApproachSection />
      <ServicesOverview />
      <FinalCTA />
      <WhyUs />
      <FAQSection />
    </Layout>
  );
};

export default Index;
