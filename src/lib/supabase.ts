import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ysqguekvedlosypdrwze.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcWd1ZWt2ZWRsb3N5cGRyd3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODgwMzgsImV4cCI6MjEwMTY2NDAzOH0.OtyA9jFDgx6Kq937fgj0_IPY5ULhO4B3vKwLrqwG4bw';

/**
 * Standard Supabase client instance using anon key.
 * Only product data is stored and retrieved from this project.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
