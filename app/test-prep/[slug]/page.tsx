import tests from "./../../../data/tests.json";
import TestClient from "./TestClient";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function TestPage({ params }: Props) {
  const p = await params;
  const slug = p.slug;
  const test = tests.find((x) => x.slug === slug);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base font-secondary">Test not found.</p>
      </div>
    );
  }

  return <TestClient test={test} allTests={tests} currentSlug={slug} />;
}

