import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HowWeStart } from "@/components/home/HowWeStart";
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
      <HowWeStart />
      <WhyUs />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
