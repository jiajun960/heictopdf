// Utility to apply rotation, flip, and filter to an image using Canvas 2D
// Input: image (ImageBitmap or HTMLImageElement), options: { rotate, flipH, flipV, brightness, contrast, saturation, hue, width, height }
// Output: dataURL (string)
export async function transformImageWithCanvas({
  image,
  rotate = 0,
  flipH = false,
  flipV = false,
  brightness = 1,
  contrast = 1,
  saturation = 1,
  hue = 0,
  width,
  height,
  output = 'dataURL', // or 'blob'
}: {
  image: ImageBitmap | HTMLImageElement,
  rotate?: number,
  flipH?: boolean,
  flipV?: boolean,
  brightness?: number,
  contrast?: number,
  saturation?: number,
  hue?: number,
  width?: number,
  height?: number,
  output?: 'dataURL' | 'blob',
}): Promise<string | Blob> {
  // Calculate target size
  const w = width || (image as HTMLImageElement | ImageBitmap).width;
  const h = height || (image as HTMLImageElement | ImageBitmap).height;
  const angle = (rotate % 360 + 360) % 360;
  let drawW = w, drawH = h;
  if (angle === 90 || angle === 270) {
    drawW = h;
    drawH = w;
  }
  const canvas = document.createElement('canvas');
  canvas.width = drawW;
  canvas.height = drawH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');
  ctx.save();
  ctx.translate(drawW / 2, drawH / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) hue-rotate(${hue}deg)`;
  ctx.drawImage(
    image,
    -w / 2,
    -h / 2,
    w,
    h
  );
  ctx.restore();
  if (output === 'blob') {
    return await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.9);
    });
  }
  return canvas.toDataURL('image/jpeg', 0.9);
} 