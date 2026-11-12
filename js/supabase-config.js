/**
 * Supabase Global Client Configuration
 */
const SUPABASE_URL = "https://qvyveonbsljfbsdfghtg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_tYK_mARJt6MzKvvRXM3JNw_7l3jm61d";

// Initialize client directly
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expose globally for both free and premium pages
window.supabase = supabaseClient;
window.supabaseClient = supabaseClient;

console.log("Supabase initialized successfully.");