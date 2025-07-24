import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "Missing imageBase64 in request body." }, { status: 400 });
    }
    const apiKey = process.env.FAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "FAL_API_KEY is not set in environment variables." }, { status: 500 });
    }
    // Call fal.ai rembg API
    const response = await fetch("https://api.fal.ai/fal-ai/imageutils/rembg", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: {
          image_url: imageBase64 // base64 Data URI from frontend
        }
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `fal.ai API error: ${errorText}` }, { status: 502 });
    }
    const result = await response.json();
    // Return the cutout image URL to the frontend
    return NextResponse.json({ url: result?.output?.image?.url || null });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
  }
} 