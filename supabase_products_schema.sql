-- ==============================================================================
-- SRI MAHALAKSHMI SUPER GAS AGENCY - PRODUCT DATA SUPABASE SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase Project (SQL Editor) if you prefer a dedicated
-- 'products' table. The application will automatically sync and read from both
-- this 'products' table and the 'site_settings' store.

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                                       -- 'Stove' | 'Spare Part' | 'Cylinder'
  sub_category TEXT,                                            -- 'stoves' | 'regulators-hoses' | 'burners-spares' | 'cylinders'
  category_label TEXT,
  description TEXT,
  price TEXT,
  price_tag TEXT,
  rating NUMERIC DEFAULT 5.0,
  rating_count INTEGER DEFAULT 100,
  discount_badge TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  image TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  whatsapp_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access so catalog visitors can view products
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products" 
ON public.products 
FOR SELECT 
TO public 
USING (true);

-- Write, Update and Delete policies for Admin management
DROP POLICY IF EXISTS "Allow public insert on products" ON public.products;
CREATE POLICY "Allow public insert on products" 
ON public.products 
FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on products" ON public.products;
CREATE POLICY "Allow public update on products" 
ON public.products 
FOR UPDATE 
TO public 
USING (true);

DROP POLICY IF EXISTS "Allow public delete on products" ON public.products;
CREATE POLICY "Allow public delete on products" 
ON public.products 
FOR DELETE 
TO public 
USING (true);
