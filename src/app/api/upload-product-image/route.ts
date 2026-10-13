import { NextRequest, NextResponse } from 'next/server';
import { uploadProductImageToR2 } from '@/lib/cloudflareR2';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided in form data' },
        { status: 400 }
      );
    }

    // Validate that it is an image
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml', 'image/avif'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|svg|avif)$/i)) {
      return NextResponse.json(
        { success: false, error: 'Only product image files (JPEG, PNG, WebP) are accepted' },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Image size exceeds maximum limit of 10MB' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadProductImageToR2(
      buffer,
      file.name,
      file.type || 'image/jpeg'
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to upload image to Cloudflare R2' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      message: 'Product image uploaded successfully to Cloudflare R2',
    });
  } catch (err: any) {
    console.error('API /api/upload-product-image error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error uploading product image' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'No image URL provided for deletion' },
        { status: 400 }
      );
    }

    const { deleteProductImageFromR2 } = await import('@/lib/cloudflareR2');
    const deleted = await deleteProductImageFromR2(url);

    return NextResponse.json({
      success: true,
      deleted,
      message: 'Product image deleted from Cloudflare R2 storage',
    });
  } catch (err: any) {
    console.error('API /api/upload-product-image DELETE error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error deleting product image' },
      { status: 500 }
    );
  }
}

