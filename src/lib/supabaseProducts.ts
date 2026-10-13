import { supabase } from './supabase';
import { ProductItem, PRODUCTS_CATALOG } from '@/config/businessData';

const LOCAL_STORAGE_KEY = 'sri_mahalaxmi_products';
const SITE_SETTINGS_KEY = 'products';

/**
 * Maps raw table row from public.products table to ProductItem
 */
function mapRowToProductItem(row: any): ProductItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category || 'Stove',
    subCategory: row.sub_category || row.subCategory || 'stoves',
    categoryLabel: row.category_label || row.categoryLabel || 'Gas Stove',
    description: row.description || '',
    priceTag: row.price_tag || row.priceTag || 'WhatsApp for Best Price',
    price: row.price || '',
    rating: Number(row.rating) || 5.0,
    ratingCount: Number(row.rating_count || row.ratingCount) || 100,
    discountBadge: row.discount_badge || row.discountBadge || '',
    inStock: row.in_stock !== undefined ? Boolean(row.in_stock) : (row.inStock !== undefined ? Boolean(row.inStock) : true),
    image: row.image || '/images/stove.jpg',
    features: Array.isArray(row.features) ? row.features : [],
    whatsAppMessage:
      row.whatsapp_message ||
      row.whatsAppMessage ||
      `Hello Sri Mahalakshmi Super Gas, I want to inquire about ${row.name}.`,
  };
}

/**
 * Maps ProductItem to public.products table row
 */
function mapProductItemToRow(item: ProductItem): Record<string, any> {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    sub_category: item.subCategory || 'stoves',
    category_label: item.categoryLabel || item.name,
    description: item.description || '',
    price: item.price || item.priceTag || '₹1,850',
    price_tag: item.priceTag || 'WhatsApp for Best Price',
    rating: item.rating || 5.0,
    rating_count: item.ratingCount || 100,
    discount_badge: item.discountBadge || '',
    in_stock: Boolean(item.inStock),
    image: item.image || '/images/stove.jpg',
    features: item.features || [],
    whatsapp_message: item.whatsAppMessage || `Hello Sri Mahalakshmi Super Gas, I want to inquire about ${item.name}.`,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches products list from Supabase.
 * Checks the dedicated public.products table first.
 * If not present, retrieves from public.site_settings (key: 'products').
 * Falls back to localStorage and default catalog.
 */
export async function getProductsFromSupabase(): Promise<ProductItem[]> {
  try {
    // 1. Try dedicated public.products table
    const { data: tableData, error: tableError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (!tableError && Array.isArray(tableData) && tableData.length > 0) {
      const items = tableData.map(mapRowToProductItem);
      // Cache locally
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // storage ignored
      }
      return items;
    }

    // 2. Try public.site_settings (key: 'products')
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', SITE_SETTINGS_KEY)
      .maybeSingle();

    if (!settingsError && settingsData?.value && Array.isArray(settingsData.value) && settingsData.value.length > 0) {
      const items = settingsData.value as ProductItem[];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // storage ignored
      }
      return items;
    }

    // 3. Fallback to localStorage if Supabase has not been seeded yet
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }

    // 4. Fallback to built-in default catalog and seed to Supabase
    seedDefaultProductsToSupabase(PRODUCTS_CATALOG).catch(() => {});
    return PRODUCTS_CATALOG;
  } catch (err) {
    console.warn('Supabase product fetch warning, using local fallback:', err);
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local) return JSON.parse(local);
      } catch {
        // ignore
      }
    }
    return PRODUCTS_CATALOG;
  }
}

/**
 * Saves the entire products list to Supabase.
 * Synchronizes with both public.site_settings and public.products (if table exists).
 */
export async function saveProductsToSupabase(
  updatedList: ProductItem[]
): Promise<{ success: boolean; error?: string }> {
  try {
    // Always update localStorage first for zero-lag UI response
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
      } catch {
        // ignore
      }
    }

    // 1. Sync to public.site_settings (key = 'products')
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert(
        {
          key: SITE_SETTINGS_KEY,
          value: updatedList,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      );

    if (settingsError) {
      console.warn('Error saving to site_settings in Supabase:', settingsError.message);
    }

    // 2. Sync to public.products table if it exists
    try {
      const rows = updatedList.map(mapProductItemToRow);
      await supabase.from('products').upsert(rows, { onConflict: 'id' });
    } catch {
      // Products table might not be created yet, site_settings handles it
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to sync products to Supabase:', err);
    return { success: false, error: err?.message || 'Unknown Supabase error' };
  }
}

/**
 * Deletes a single product from Supabase.
 */
export async function deleteProductFromSupabase(
  productId: string,
  currentProducts: ProductItem[]
): Promise<{ success: boolean; updated: ProductItem[] }> {
  const updated = currentProducts.filter((p) => p.id !== productId);
  await saveProductsToSupabase(updated);

  // Also attempt delete from public.products table if it exists
  try {
    await supabase.from('products').delete().eq('id', productId);
  } catch {
    // Ignore if table not present
  }

  return { success: true, updated };
}

/**
 * Seeds initial catalog to Supabase
 */
export async function seedDefaultProductsToSupabase(
  catalog: ProductItem[]
): Promise<boolean> {
  try {
    const { error } = await supabase.from('site_settings').upsert({
      key: SITE_SETTINGS_KEY,
      value: catalog,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}
