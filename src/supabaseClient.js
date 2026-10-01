import { createClient } from '@supabase/supabase-js';

const getEnv = (key) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || import.meta.env[`VITE_${key}`];
  }
  return undefined;
};

// CRITICAL SECURITY RULE: The base URL MUST NOT contain /rest/v1/. Use the root URL strictly.
const rawUrl =
  getEnv('NEXT_PUBLIC_SUPABASE_URL') ||
  getEnv('VITE_SUPABASE_URL') ||
  'https://xbsnfptwjxzlqyotsnmf.supabase.co';

const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const SUPABASE_PUBLIC_KEY =
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  getEnv('VITE_SUPABASE_ANON_KEY') ||
  'sb_publishable_bDbRlVwG_dIBaapaHE4yLA_Cbgn71pX';

if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
  console.error('Missing Supabase configuration parameters.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
