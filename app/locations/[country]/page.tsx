import countries from "./../../../data/countries.json";
import CountryClient from "./CountryClient";

type Props = {
  params: Promise<{ country: string }> | { country: string };
};

export default async function CountryPage({ params }: Props) {
  const p = await params;
  const slug = p.country;
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base font-secondary">Country not found.</p>
      </div>
    );
  }

  return <CountryClient country={country} allCountries={countries} currentSlug={slug} />;
}

