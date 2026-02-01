// Home page – uses redesign components (relative layout, simple bg). Header, Testimonials, Footer unchanged.
import HeroRedesign from "@/components/HomeRedesign/HeroRedesign";
import AboutRedesign from "@/components/HomeRedesign/AboutRedesign";
import ProcedureRedesign from "@/components/HomeRedesign/ProcedureRedesign";
import ExamTrainingRedesign from "@/components/HomeRedesign/ExamTrainingRedesign";
import CountriesRedesign from "@/components/HomeRedesign/CountriesRedesign";
import TestimonialsRedesign from "@/components/HomeRedesign/TestimonialsRedesign";
import WhoWeAreRedesign from "@/components/HomeRedesign/WhoWeAreRedesign";

export default function Home() {
  return (
    <div className="relative">
      <HeroRedesign />
      <main className="relative">
        <AboutRedesign />
        <ProcedureRedesign />
        <ExamTrainingRedesign />
        <CountriesRedesign />
        <TestimonialsRedesign />
        <WhoWeAreRedesign />
      </main>
    </div>
  );
}
