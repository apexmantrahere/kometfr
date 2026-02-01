"use client";

import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  content: string;
}

const steps: Step[] = [
  { id: 1, title: "Initial Consultation", description: "Understanding your goals and aspirations", content: "We start with a comprehensive consultation to understand your academic goals, preferred destinations, and career aspirations. This helps us create a personalized roadmap for your study abroad journey." },
  { id: 2, title: "Profile Assessment", description: "Evaluating your academic and professional profile", content: "Our experts assess your academic records, test scores, work experience, and extracurricular activities to identify the best-fit universities and programs that align with your profile." },
  { id: 3, title: "University Selection", description: "Curating the perfect university list", content: "Based on your profile and preferences, we help you shortlist universities that match your academic goals, budget, and lifestyle preferences. We ensure you have a balanced mix of dream, target, and safety schools." },
  { id: 4, title: "Application Process", description: "Guiding you through every application step", content: "We assist you with every aspect of the application process - from writing compelling essays and preparing recommendation letters to filling out forms and meeting deadlines. Our team ensures nothing is missed." },
  { id: 5, title: "Visa & Pre-Departure", description: "Final steps to your new adventure", content: "Once accepted, we guide you through the visa application process, help with accommodation arrangements, and provide pre-departure orientation to ensure you're fully prepared for your study abroad experience." },
];

function StepImage({ step }: { step: Step }) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-100">
      <Image
        src={`/Images/step${step.id}.jpg`}
        alt={step.title}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

function StepText({ step }: { step: Step }) {
  return (
    <div className="py-2">
      <p className="text-sm text-gray-700 font-secondary mb-3">
        Step {step.id} of {steps.length}
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-[#c44200] font-latin mb-2">
        {step.title}
      </h3>
      <p className="text-sm font-semibold text-[#0d173f] font-secondary mb-3">
        {step.description}
      </p>
      <p className="text-neutral-700 font-secondary text-sm md:text-base leading-relaxed">
        {step.content}
      </p>
    </div>
  );
}

export default function ProcedureRedesign() {
  return (
    <section className="relative w-full bg-white pb-14 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#c44200] font-latin text-center mb-4">
          How We Work
        </h2>
        <p className="text-neutral-600 font-secondary text-center max-w-xl mx-auto mb-14">
          A clear, step-by-step process from first call to departure.
        </p>

        <div className="space-y-0">
          {steps.map((step, idx) => {
            const imageOnLeft = idx % 2 === 0; // step 1, 3, 5: image left, text right. Step 2, 4: text left, image right
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.id}
                className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] py-6 md:py-10 gap-2 md:gap-6 items-center"
              >
                {/* Left column */}
                <div
                  className={`min-w-0 flex justify-end w-full ${imageOnLeft ? "order-1 md:order-none" : "order-2 md:order-none"}`}
                >
                  {imageOnLeft ? (
                    <div className="w-full max-w-lg">
                      <StepImage step={step} />
                    </div>
                  ) : (
                    <div className="w-full max-w-lg">
                      <StepText step={step} />
                    </div>
                  )}
                </div>

                {/* Center: node + dashed line (hidden on mobile) */}
                <div className="hidden md:flex flex-col items-center px-2" />

                {/* Right column */}
                <div
                  className={`min-w-0 w-full ${imageOnLeft ? "order-2 md:order-none" : "order-1 md:order-none"}`}
                >
                  {imageOnLeft ? (
                    <div className="w-full max-w-lg">
                      <StepText step={step} />
                    </div>
                  ) : (
                    <div className="w-full max-w-lg">
                      <StepImage step={step} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
