import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/api";

export async function GET() {
  try {
    const data = await getTestimonials();
    return NextResponse.json(data);
  } catch (e) {
    console.error("[api/testimonials] Error fetching testimonials:", e);
    return NextResponse.json(
      { error: "Failed to fetch testimonials", data: [] },
      { status: 500 }
    );
  }
}
