import { redirect } from 'next/navigation';
import { PRODUCTS_CATALOG, getProductCategoryKey } from '@/config/businessData';

export function generateStaticParams() {
  const params: { category: string; id: string }[] = [];
  for (const product of PRODUCTS_CATALOG) {
    const catKey = getProductCategoryKey(product);
    params.push({ category: catKey, id: product.id });
  }
  return params;
}

export default function ProductDetailPage() {
  redirect('/products');
}
