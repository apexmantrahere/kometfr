/**
 * Server-only API client. Base URL is read from env (.env.local in dev) and must never be exposed to the client.
 * Use only in server components, API routes, or server actions.
 */

function getBaseUrl(): string {
  const base = process.env.KOMET_API_BASE_URL;
  if (!base || base.trim() === "") {
    throw new Error("KOMET_API_BASE_URL is not set. Add it to .env.local (e.g. KOMET_API_BASE_URL=https://komet2.vercel.app)");
  }
  return base.trim().replace(/\/$/, "");
}

export type TestimonialItem = {
  id: string;
  name: string;
  designation?: string;
  review: string;
  image?: string;
  createdAt?: string;
};

export type TestimonialsResponse = {
  data: TestimonialItem[];
};

export async function getTestimonials(): Promise<TestimonialsResponse> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/testimonials`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Testimonials API error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as TestimonialsResponse;
  return json;
}

export type GalleryItem = {
  id: string;
  media_type: string;
  media_url: string;
  createdAt?: string;
};

export type GalleryResponse = {
  data: GalleryItem[];
};

export async function getGallery(): Promise<GalleryResponse> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/gallery`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Gallery API error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as GalleryResponse;
  return json;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/contact`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as { error?: string })?.error ?? "Failed to submit";
    throw new Error(msg);
  }
}
