import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://fbjgqncfisvirdzuywbq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiamdxbmNmaXN2aXJkenV5d2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMTU3MzcsImV4cCI6MjA1Mzg5MTczN30.oavRHx6jvoMzFda-rgHgfeNLDsWqdoYwT_zLDB40Lj8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 