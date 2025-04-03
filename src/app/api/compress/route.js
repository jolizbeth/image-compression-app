import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { imagePath } = await req.json();
    if (!imagePath) {
      return NextResponse.json({ error: "No image path provided" }, { status: 400 });
    }
    // create the path to the uploaded image
    const uploadPath = path.join(process.cwd(), "public", imagePath);
    if (!fs.existsSync(uploadPath)) {
      return NextResponse.json({ error: "Image file not found" }, { status: 404 });
    }
    //save the compressed image
    const compressedFileName = `compressed-${path.basename(imagePath)}`;
    const compressedPath = path.join(process.cwd(), "public/compressed", compressedFileName);
    //use sharp to compress the image 
    await sharp(uploadPath)
      .resize(800)
      .jpeg({ quality: 70 })
      .toFile(compressedPath);

    return NextResponse.json({ compressedPath: `/compressed/${compressedFileName}` }, { status: 200 });
  } catch (error) {
    console.error("Error during image compression:", error);
    return NextResponse.json({ error: "Error compressing image" }, { status: 500 });
  }
}
