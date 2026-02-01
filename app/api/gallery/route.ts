import { NextResponse } from "next/server";
import { getGallery } from "@/lib/api";

export async function GET() {
  try {
    const data = await getGallery();
    return NextResponse.json(data);
  } catch (e) {
    console.error("[api/gallery] Error fetching gallery:", e);
    return NextResponse.json(
      { error: "Failed to fetch gallery", data: [] },
      { status: 500 }
    );
  }
}
