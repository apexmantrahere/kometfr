import ServicesClient from "./ServicesClient";

type Props = {
  searchParams: Promise<{ tab?: string }> | { tab?: string };
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await Promise.resolve(searchParams);
  const tab = params?.tab ?? undefined;
  return <ServicesClient initialTab={tab} />;
}

