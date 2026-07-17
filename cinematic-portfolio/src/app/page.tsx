import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import FeatureStory from "@/components/FeatureStory";
import Approach from "@/components/Approach";
import Results from "@/components/Results";
import FinalSequence from "@/components/FinalSequence";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <BrandStatement />
      <FeatureStory />
      <Approach />
      <Results />
      <FinalSequence />
      <CTAFooter />
    </main>
  );
}
