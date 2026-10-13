import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '';

export const R2_BUCKET_NAME =
  process.env.CLOUDFLARE_R2_BUCKET_NAME || 'mechanic-images';
export const R2_PUBLIC_URL = (
  process.env.CLOUDFLARE_R2_PUBLIC_URL ||
  'https://pub-f471c3e24db144a6a94c290eececee02.r2.dev'
).replace(/\/$/, '');

/**
 * Dedicated S3 client configured specifically for Cloudflare R2 bucket.
 * Reads credentials strictly from server environment variables (.env.local).
 * Never exposed to client-side bundles.
 */
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Uploads a product image buffer to Cloudflare R2.
 * Stores strictly under the `products/` prefix.
 */
export async function uploadProductImageToR2(
  fileBuffer: Buffer | Uint8Array,
  fileName: string,
  contentType: string = 'image/jpeg'
): Promise<{ success: boolean; url: string; key: string; error?: string }> {
  try {
    const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueKey = `products/${Date.now()}_${cleanName}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: uniqueKey,
        Body: fileBuffer,
        ContentType: contentType,
      })
    );

    const publicUrl = `${R2_PUBLIC_URL}/${uniqueKey}`;
    return {
      success: true,
      url: publicUrl,
      key: uniqueKey,
    };
  } catch (err: any) {
    console.error('Cloudflare R2 product image upload failed:', err);
    return {
      success: false,
      url: '',
      key: '',
      error: err?.message || 'Failed to upload image to Cloudflare R2',
    };
  }
}

/**
 * Deletes a product image from Cloudflare R2.
 */
export async function deleteProductImageFromR2(imageKeyOrUrl: string): Promise<boolean> {
  try {
    let key = imageKeyOrUrl;
    if (key.startsWith('http')) {
      const parts = key.split('.r2.dev/');
      if (parts.length > 1) {
        key = parts[1];
      }
    }

    if (!key.startsWith('products/')) {
      // Safety guard: only allow deleting from products/ prefix
      return false;
    }

    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}
