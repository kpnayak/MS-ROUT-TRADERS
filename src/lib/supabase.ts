import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || 'https://bdxliqavbwwxgjkdyupd.supabase.co';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || 'sb_publishable_M_gLWWPmehLnsJLpuozcEA_FsX0WESI';

export const isSupabaseConfigured = Boolean(
  metaEnv.VITE_SUPABASE_URL &&
  metaEnv.VITE_SUPABASE_ANON_KEY &&
  !metaEnv.VITE_SUPABASE_URL.includes('bdxliqavbwwxgjkdyupd')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

