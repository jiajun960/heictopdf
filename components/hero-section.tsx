"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Download, ArrowUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import EditToolbar from './edit-toolbar';
import { transformImageWithCanvas } from "@/lib/image-transform";
import Logo from './logo';

interface ImageFile {
  id: string
  file: File
  preview: string
  name: string
  width?: number // 图片宽度
  height?: number // 图片高度
  rotate: number // 角度，0/90/180/270
  flipH: boolean // 水平翻转
  flipV: boolean // 垂直翻转
  brightness: number // 亮度，默认1
  contrast: number // 对比度，默认1
  saturation: number // 饱和度，默认1
  hue: number // 色相，默认0
}

// 1. 文件顶部加类型声明（临时方案）
// eslint-disable-next-line

export default function HeroSection() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const draggedItem = useRef<number | null>(null)
  // Page size state
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'auto'>('a4');
  // Margin state (new)
  const [margin, setMargin] = useState<'none' | 'small' | 'medium' | 'large'>('none');
  // Margin change handler
  const handleMarginChange = (value: 'none' | 'small' | 'medium' | 'large') => setMargin(value);

  const handleFiles = useCallback(async (files: FileList) => {
    console.log('🚀 开始处理文件上传，总文件数:', files.length);
    
    const heicFiles = Array.from(files).filter(
      (file) =>
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif"),
    );
    const otherFiles = Array.from(files).filter(
      (file) =>
        !(
          file.type === "image/heic" ||
          file.type === "image/heif" ||
          file.name.toLowerCase().endsWith(".heic") ||
          file.name.toLowerCase().endsWith(".heif")
        )
    );

    console.log('📁 HEIC文件数:', heicFiles.length, '其他文件数:', otherFiles.length);

    // 处理HEIC文件
    if (heicFiles.length > 0) {
      console.log('🔄 开始处理HEIC文件...');
              const libheif = await import("libheif-js");
      console.log('✅ libheif-js 加载成功');
      
      // 🔧 修复：批量处理所有文件，一次性更新状态
      const newImages: ImageFile[] = [];
      
      for (let i = 0; i < heicFiles.length; i++) {
        const file = heicFiles[i];
        const startTime = performance.now();
        console.log(`📸 开始处理第${i + 1}张HEIC图片:`, file.name);
        
        try {
        const id = Math.random().toString(36).substr(2, 9);
          console.log(`🆔 生成图片ID:`, id);
          
        const arrayBuffer = await file.arrayBuffer();
          console.log(`📦 文件转ArrayBuffer成功，大小:`, arrayBuffer.byteLength);
          
        // 1. 解码HEIC为ImageData
        const decoder = new libheif.HeifDecoder();
        const data = decoder.decode(arrayBuffer);
        const image = data[0];
        const width = image.get_width();
        const height = image.get_height();
          console.log(`🔍 HEIC解码成功，尺寸:`, width, 'x', height);
          
        // 2. 用Canvas渲染ImageData
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
          if (!ctx) {
            console.error(`❌ Canvas 2D context 创建失败，跳过图片:`, file.name);
            continue;
          }
          console.log(`🎨 Canvas创建成功`);
          
        const imageData = ctx.createImageData(width, height);
          console.log(`🖼️ ImageData创建成功`);
          
        // 用libheif-js的display方法填充像素
        await new Promise<void>((resolve, reject) => {
          image.display(imageData, (displayData: unknown) => {
              if (!displayData) {
                console.error(`❌ HEIC display error，图片:`, file.name);
                return reject(new Error("HEIC display error"));
              }
            ctx.putImageData(imageData, 0, 0);
              console.log(`✅ HEIC像素数据写入Canvas成功`);
            resolve();
          });
        });
          
        // 3. 生成dataURL
        const preview = canvas.toDataURL("image/jpeg", 0.9);
          console.log(`🖼️ dataURL生成成功，长度:`, preview.length);
          
          // 🔧 修复：收集到数组中，不立即更新状态
          newImages.push({
            id,
            file,
            preview,
            name: file.name,
            rotate: 0,
            flipH: false,
            flipV: false,
            brightness: 1,
            contrast: 1,
            saturation: 1,
            hue: 0,
          });
          
          const endTime = performance.now();
          console.log(`✅ 第${i + 1}张图片处理完成，耗时:`, (endTime - startTime).toFixed(2), 'ms');
          
        } catch (error) {
          console.error(`❌ 处理第${i + 1}张图片失败:`, file.name, error);
        }
      }
      
      // 🚀 优化：一次性更新状态，CSS立即生效
      if (newImages.length > 0) {
        console.log(`📝 批量更新images状态，新增图片数:`, newImages.length);
        setImages((prev) => {
          const updatedImages = [...prev, ...newImages];
          console.log(`📊 总图片数:`, prev.length, '→', updatedImages.length);
          
                // ✅ 移除Canvas异步处理，避免双重渲染冲突
          
          return updatedImages;
        });
      }
      
      console.log('🎉 HEIC文件处理完成');
    }

    // 处理非HEIC文件（如JPG/PNG等，保持原有逻辑）
    otherFiles.forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      setImages((prev) => [
        ...prev,
        {
          id,
          file,
          preview,
          name: file.name,
          rotate: 0,
          flipH: false,
          flipV: false,
          brightness: 1,
          contrast: 1,
          saturation: 1,
          hue: 0,
        },
      ]);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return updated
    })
  }, [])

  const handleDragStart = (index: number) => {
    draggedItem.current = index
  }

  const handleDragEnd = () => {
    draggedItem.current = null
  }

  const handleDragOverItem = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem.current === null) return

    const draggedOverItem = index
    if (draggedItem.current === draggedOverItem) return

    setImages((prev) => {
      const items = [...prev]
      const draggedItemContent = items[draggedItem.current!]
      items.splice(draggedItem.current!, 1)
      items.splice(draggedOverItem, 0, draggedItemContent)
      return items
    })
    draggedItem.current = draggedOverItem
  }

  // PDF page size constants (in points)
  const PAGE_SIZES = {
    a4: { width: 595, height: 842 },      // 210mm x 297mm
    letter: { width: 612, height: 792 }, // 8.5in x 11in
  };

  // Margin mapping: percent of page width/height
  const MARGIN_PERCENT = {
    none: 0,
    small: 0.05,   // 5%
    medium: 0.10,  // 10%
    large: 0.15,   // 15%
  };

  const convertToPDF = async () => {
    if (images.length === 0) return

    setIsConverting(true)
    try {
      // Dynamic imports for client-side only libraries
      const [{ PDFDocument }, libheif] = await Promise.all([import("pdf-lib"), import("libheif-js")])
      const pdfDoc = await PDFDocument.create()

      // ✅ 在PDF导出时统一处理所有Canvas变换
      console.log('🔄 PDF导出时统一处理Canvas变换');
      
      for (const imageFile of images) {
        try {
          // Decode image to ImageBitmap or HTMLImageElement
          let imageBitmap: ImageBitmap | HTMLImageElement;
          if (imageFile.file.type === "image/heic" || imageFile.file.type === "image/heif" || imageFile.name.toLowerCase().endsWith(".heic") || imageFile.name.toLowerCase().endsWith(".heif")) {
            const decoder = new libheif.HeifDecoder();
            const arrayBuffer = await imageFile.file.arrayBuffer();
            const data = decoder.decode(arrayBuffer);
            const heicImage = data[0];
            const width = heicImage.get_width();
            const height = heicImage.get_height();
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas 2D context not available");
            const imageData = ctx.createImageData(width, height);
            await new Promise<void>((resolve, reject) => {
              heicImage.display(imageData, (displayData: unknown) => {
                if (!displayData) return reject(new Error("HEIC display error"));
                ctx.putImageData(imageData, 0, 0);
                resolve();
              });
            });
            imageBitmap = await createImageBitmap(canvas);
          } else {
            imageBitmap = await new Promise((resolve, reject) => {
              const imgEl = new window.Image();
              imgEl.onload = () => resolve(imgEl);
              imgEl.onerror = reject;
              imgEl.src = URL.createObjectURL(imageFile.file);
            });
          }
          // ✅ 在PDF导出时应用所有变换（旋转、翻转、滤镜）
          const transformed = await transformImageWithCanvas({
            image: imageBitmap,
            rotate: imageFile.rotate,
            flipH: imageFile.flipH,
            flipV: imageFile.flipV,
            brightness: imageFile.brightness,
            contrast: imageFile.contrast,
            saturation: imageFile.saturation,
            hue: imageFile.hue,
            output: 'blob',
          }) as Blob;
          const jpegBytes = await transformed.arrayBuffer();
          const jpegImage = await pdfDoc.embedJpg(jpegBytes);
          // === PDF page size logic ===
          let pageWidth: number, pageHeight: number;
          if (pageSize === 'a4' || pageSize === 'letter') {
            pageWidth = PAGE_SIZES[pageSize].width;
            pageHeight = PAGE_SIZES[pageSize].height;
          } else {
            pageWidth = jpegImage.width;
            pageHeight = jpegImage.height;
          }
          const marginPercent = MARGIN_PERCENT[margin];
          const marginX = pageWidth * marginPercent;
          const marginY = pageHeight * marginPercent;
          // Calculate available area for the image
          const availableWidth = pageWidth - 2 * marginX;
          const availableHeight = pageHeight - 2 * marginY;
          // Scale image to fit available area, keep aspect ratio
          let drawWidth = jpegImage.width, drawHeight = jpegImage.height, x = 0, y = 0;
          const scale = Math.min(availableWidth / jpegImage.width, availableHeight / jpegImage.height);
          drawWidth = jpegImage.width * scale;
          drawHeight = jpegImage.height * scale;
          x = (pageWidth - drawWidth) / 2;
          y = (pageHeight - drawHeight) / 2;
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          page.drawImage(jpegImage, {
            x, y, width: drawWidth, height: drawHeight
          });
        } catch (error) {
          console.error("Error processing image:", imageFile.name, error);
        }
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      // Download the PDF
      const a = document.createElement("a")
      a.href = url
      a.download = "converted-images.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Conversion error:", error)
      alert("Error converting files. Please make sure you uploaded valid HEIC files.")
    } finally {
      setIsConverting(false)
    }
  }

  // ✅ 优化：批量旋转/翻转操作 - 只保留CSS实时预览
  function handleRotateFlipAll(type: 'cw' | 'ccw' | 'flipH' | 'flipV') {
    console.log('🔄 开始旋转/翻转操作:', type);
    
    // ✅ 只更新状态，CSS立即生效，移除Canvas异步处理
    setImages(prev => {
      const updatedImages = prev.map(img => {
      if (type === 'cw') {
        return { ...img, rotate: (img.rotate + 90) % 360 };
      } else if (type === 'ccw') {
        return { ...img, rotate: (img.rotate + 270) % 360 };
      } else if (type === 'flipH') {
        return { ...img, flipH: !img.flipH };
      } else if (type === 'flipV') {
        return { ...img, flipV: !img.flipV };
      }
      return img;
      });
      
      console.log(`📝 旋转/翻转状态更新完成，图片数:`, updatedImages.length);
      
      // ✅ 移除Canvas异步处理，避免双重渲染冲突
      return updatedImages;
    });
  }

  // ✅ 优化：批量调色参数同步 - 只保留CSS实时预览
  function handleColorAdjustAll(key: 'brightness' | 'contrast' | 'saturation' | 'hue', value: number) {
    console.log('🎨 开始调色操作:', key, '=', value);
    
    // ✅ 只更新状态，CSS立即生效，移除Canvas异步处理
    setImages(prev => {
      const updatedImages = prev.map(img => ({ ...img, [key]: value }));
      console.log(`📝 调色状态更新完成，图片数:`, updatedImages.length);
      
      // ✅ 移除Canvas异步处理，避免双重渲染冲突
      return updatedImages;
    });
  }

  // ✅ 移除applyTransformsToAllImages函数，因为不再需要实时Canvas处理
  // 所有Canvas变换现在只在PDF导出时统一处理

  // ✅ 移除useEffect的自动触发，避免循环调用

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Convert HEIC to PDF Online
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Fast, free, and secure HEIC to PDF conversion. Process your files locally in your browser - no upload
              required.
            </p>
          </div>

          <Card className="w-full max-w-4xl p-6">
            {images.length === 0 ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                  isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop HEIC files here</h3>
                <p className="text-muted-foreground mb-4">or click to select files from your device</p>
                <Button onClick={() => fileInputRef.current?.click()}>Choose Files</Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".heic,.heif,image/heic,image/heif"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-col items-start gap-y-2">
                  <h3 className="text-lg font-semibold">
                    {images.length} HEIC file{images.length > 1 ? "s" : ""} selected
                  </h3>
                    <EditToolbar
                      onRotateFlip={handleRotateFlipAll}
                      onColorAdjust={handleColorAdjustAll}
                      pageSize={pageSize}
                      onPageSizeChange={setPageSize}
                      margin={margin}
                      onMarginChange={handleMarginChange}
                    />
                  </div>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Add More Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".heic,.heif,image/heic,image/heif"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => {
                    // Calculate aspectRatio
                    let aspectRatio: number | undefined = undefined;
                    if (pageSize === 'a4') {
                      aspectRatio = 210 / 297;
                    } else if (pageSize === 'letter') {
                      aspectRatio = 8.5 / 11;
                    } else if (pageSize === 'auto' && image.width && image.height) {
                      aspectRatio = image.width / image.height;
                    }
                    // Fallback for missing width/height
                    if (!aspectRatio || isNaN(aspectRatio)) aspectRatio = 1;

                    // Determine background
                    const showWhiteBg = pageSize === 'a4' || pageSize === 'letter';

                    // Calculate margin for preview (simulate PDF margin visually)
                    const marginPercent = MARGIN_PERCENT[margin];
                    const paddingPercent = marginPercent * 100;

                    return (
                      <div
                        key={image.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOverItem(e, index)}
                        className="relative group cursor-move border rounded-lg overflow-hidden"
                        style={{ aspectRatio: aspectRatio }}
                      >
                        <div
                          className={`flex items-center justify-center w-full h-full ${showWhiteBg ? 'bg-white' : ''}`}
                          style={{ width: '100%', height: '100%', padding: `${paddingPercent}%` }}
                        >
                          {image.preview ? (
                            <img
                              src={image.preview}
                              alt={`Preview of ${image.name}`}
                              className="object-contain w-full h-full transition-all duration-300"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                // 🚀 实时预览：立即应用CSS变换
                                transform: `rotate(${image.rotate}deg) scale(${image.flipH ? -1 : 1}, ${image.flipV ? -1 : 1})`,
                                filter: `brightness(${image.brightness}) contrast(${image.contrast}) saturate(${image.saturation}) hue-rotate(${image.hue}deg)`
                              }}
                            />
                          ) : (
                            <div className="text-xs text-muted-foreground text-center p-2">
                              <Upload className="h-8 w-8 mx-auto mb-2" />
                              {image.name}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-2 left-2 bg-background/80 rounded px-1 text-xs">{index + 1}</div>
                        <ArrowUpDown className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground" />
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={convertToPDF} disabled={isConverting} size="lg" className="min-w-[200px]">
                    {isConverting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Convert to PDF
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      images.forEach((img) => URL.revokeObjectURL(img.preview))
                      setImages([])
                    }}
                    size="lg"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
